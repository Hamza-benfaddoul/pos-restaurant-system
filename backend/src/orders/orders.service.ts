import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    private productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    if (!createOrderDto.items || createOrderDto.items.length === 0) {
      throw new BadRequestException('Order must have at least one item');
    }

    // Create order items
    const orderItems: OrderItem[] = [];
    let subtotal = 0;

    for (const item of createOrderDto.items) {
      const product = await this.productsService.findOne(item.productId);
      
      if (!product.available) {
        throw new BadRequestException(`Product ${product.name} is not available`);
      }

      const itemSubtotal = Number(product.price) * item.quantity;
      subtotal += itemSubtotal;

      const orderItem = this.orderItemsRepository.create({
        product,
        quantity: item.quantity,
        price: product.price,
        subtotal: itemSubtotal,
      });
      orderItems.push(orderItem);
    }

    // Calculate tax (10% for example)
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    // Generate order number
    const orderNumber = `ORD-${Date.now()}`;

    // Create order
    const order = this.ordersRepository.create({
      orderNumber,
      subtotal,
      tax,
      total,
      items: orderItems,
      customerName: createOrderDto.customerName,
      notes: createOrderDto.notes,
      paymentMethod: createOrderDto.paymentMethod,
      status: OrderStatus.PENDING,
    });

    return await this.ordersRepository.save(order);
  }

  async findAll(status?: OrderStatus): Promise<Order[]> {
    const where = status ? { status } : {};
    return await this.ordersRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.findOne(id);
    order.status = status;
    return await this.ordersRepository.save(order);
  }

  async getTodaysSales(): Promise<{ totalSales: number; orderCount: number }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const orders = await this.ordersRepository
      .createQueryBuilder('order')
      .where('order.createdAt >= :today', { today })
      .andWhere('order.status = :status', { status: OrderStatus.COMPLETED })
      .getMany();

    const totalSales = orders.reduce((sum, order) => sum + Number(order.total), 0);
    
    return {
      totalSales,
      orderCount: orders.length,
    };
  }
}
