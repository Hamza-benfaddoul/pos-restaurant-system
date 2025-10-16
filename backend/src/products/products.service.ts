import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, ...productData } = createProductDto;
    const category = await this.categoriesService.findOne(categoryId);
    
    const product = this.productsRepository.create({
      ...productData,
      category,
    });
    return await this.productsRepository.save(product);
  }

  async findAll(categoryId?: string): Promise<Product[]> {
    const where: any = { available: true };
    if (categoryId) {
      where.category = { id: categoryId };
    }
    return await this.productsRepository.find({
      where,
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: Partial<CreateProductDto>): Promise<Product> {
    await this.findOne(id);
    const { categoryId, ...productData } = updateProductDto;
    
    if (categoryId) {
      const category = await this.categoriesService.findOne(categoryId);
      await this.productsRepository.update(id, { ...productData, category });
    } else {
      await this.productsRepository.update(id, productData);
    }
    
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }
}
