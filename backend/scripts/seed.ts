import { DataSource } from 'typeorm';
import { Category } from '../src/categories/category.entity';
import { Product } from '../src/products/product.entity';

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'pos_restaurant',
    entities: [Category, Product],
    synchronize: false,
  });

  await dataSource.initialize();

  const categoryRepository = dataSource.getRepository(Category);
  const productRepository = dataSource.getRepository(Product);

  // Check if data already exists
  const existingCategories = await categoryRepository.count();
  if (existingCategories > 0) {
    console.log('Database already seeded');
    await dataSource.destroy();
    return;
  }

  // Create categories
  const appetizers = await categoryRepository.save({
    name: 'Appetizers',
    description: 'Start your meal with our delicious appetizers',
    active: true,
  });

  const mainCourses = await categoryRepository.save({
    name: 'Main Courses',
    description: 'Our signature main dishes',
    active: true,
  });

  const desserts = await categoryRepository.save({
    name: 'Desserts',
    description: 'Sweet treats to end your meal',
    active: true,
  });

  const beverages = await categoryRepository.save({
    name: 'Beverages',
    description: 'Refreshing drinks',
    active: true,
  });

  // Create products
  await productRepository.save([
    // Appetizers
    {
      name: 'Spring Rolls',
      description: 'Crispy vegetable spring rolls',
      price: 6.99,
      available: true,
      category: appetizers,
    },
    {
      name: 'Chicken Wings',
      description: 'Spicy buffalo wings',
      price: 8.99,
      available: true,
      category: appetizers,
    },
    {
      name: 'Garlic Bread',
      description: 'Toasted bread with garlic butter',
      price: 4.99,
      available: true,
      category: appetizers,
    },
    // Main Courses
    {
      name: 'Grilled Chicken',
      description: 'Herb-marinated grilled chicken breast',
      price: 15.99,
      available: true,
      category: mainCourses,
    },
    {
      name: 'Beef Burger',
      description: 'Juicy beef patty with fresh vegetables',
      price: 12.99,
      available: true,
      category: mainCourses,
    },
    {
      name: 'Margherita Pizza',
      description: 'Classic pizza with tomato and mozzarella',
      price: 13.99,
      available: true,
      category: mainCourses,
    },
    {
      name: 'Pasta Carbonara',
      description: 'Creamy pasta with bacon',
      price: 14.99,
      available: true,
      category: mainCourses,
    },
    // Desserts
    {
      name: 'Chocolate Cake',
      description: 'Rich chocolate layer cake',
      price: 6.99,
      available: true,
      category: desserts,
    },
    {
      name: 'Ice Cream',
      description: 'Vanilla ice cream with toppings',
      price: 4.99,
      available: true,
      category: desserts,
    },
    {
      name: 'Tiramisu',
      description: 'Classic Italian dessert',
      price: 7.99,
      available: true,
      category: desserts,
    },
    // Beverages
    {
      name: 'Coca Cola',
      description: 'Classic soft drink',
      price: 2.99,
      available: true,
      category: beverages,
    },
    {
      name: 'Orange Juice',
      description: 'Fresh squeezed orange juice',
      price: 3.99,
      available: true,
      category: beverages,
    },
    {
      name: 'Coffee',
      description: 'Freshly brewed coffee',
      price: 2.49,
      available: true,
      category: beverages,
    },
  ]);

  console.log('Database seeded successfully!');
  await dataSource.destroy();
}

seed().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
