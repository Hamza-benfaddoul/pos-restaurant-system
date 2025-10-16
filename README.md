# POS Restaurant System

A modern Point of Sale (POS) system for restaurants with a focus on cashier functionality. Built with React, NestJS, PostgreSQL, and Docker.

## Features

- **Cashier Interface**: Modern, intuitive interface for order management
- **Product Management**: Organize products by categories
- **Order Processing**: Create and manage orders with real-time updates
- **Payment Processing**: Support for multiple payment methods (Cash, Card, Mobile)
- **Sales Tracking**: View today's sales and order statistics
- **REST API**: Full-featured backend API

## Technology Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client

### Backend
- **NestJS** - Node.js framework
- **TypeORM** - ORM for database operations
- **PostgreSQL** - Relational database
- **Class Validator** - Input validation

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## Project Structure

```
pos-restaurant-system/
├── backend/               # NestJS backend application
│   ├── src/
│   │   ├── categories/   # Category module
│   │   ├── products/     # Product module
│   │   ├── orders/       # Order module
│   │   └── main.ts       # Application entry point
│   ├── Dockerfile
│   └── package.json
├── frontend/             # React frontend application
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── main.jsx     # Application entry point
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
└── docker-compose.yml    # Docker Compose configuration
```

## Getting Started

### Prerequisites

- Docker and Docker Compose installed
- Node.js 20+ (for local development)
- npm or yarn

### Running with Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/Hamza-benfaddoul/pos-restaurant-system.git
cd pos-restaurant-system
```

2. Start all services with Docker Compose:
```bash
docker-compose up -d
```

3. Access the application:
- Frontend: http://localhost
- Backend API: http://localhost:3000/api
- PostgreSQL: localhost:5432

### Local Development

#### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run start:dev
```

The backend will be available at http://localhost:3000

#### Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:5173

## API Documentation

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `GET /api/categories/:id` - Get a category by ID
- `PATCH /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Products

- `GET /api/products` - Get all products (optional: ?categoryId=xxx)
- `POST /api/products` - Create a new product
- `GET /api/products/:id` - Get a product by ID
- `PATCH /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Orders

- `GET /api/orders` - Get all orders (optional: ?status=pending|completed|cancelled)
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get an order by ID
- `PATCH /api/orders/:id/status` - Update order status
- `GET /api/orders/today/sales` - Get today's sales statistics

## Database Schema

### Categories
- id (UUID, Primary Key)
- name (String)
- description (String, nullable)
- active (Boolean)
- createdAt (Timestamp)
- updatedAt (Timestamp)

### Products
- id (UUID, Primary Key)
- name (String)
- description (String, nullable)
- price (Decimal)
- image (String, nullable)
- available (Boolean)
- categoryId (UUID, Foreign Key)
- createdAt (Timestamp)
- updatedAt (Timestamp)

### Orders
- id (UUID, Primary Key)
- orderNumber (String)
- status (Enum: pending, completed, cancelled)
- subtotal (Decimal)
- tax (Decimal)
- total (Decimal)
- paymentMethod (Enum: cash, card, mobile)
- customerName (String, nullable)
- notes (String, nullable)
- createdAt (Timestamp)
- updatedAt (Timestamp)

### Order Items
- id (UUID, Primary Key)
- quantity (Integer)
- price (Decimal)
- subtotal (Decimal)
- orderId (UUID, Foreign Key)
- productId (UUID, Foreign Key)

## Environment Variables

### Backend (.env)
```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=pos_restaurant
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
PORT=3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api
```

## Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild images
docker-compose build

# Restart a specific service
docker-compose restart backend
```

## Testing

### Backend
```bash
cd backend
npm run test
```

### Frontend
```bash
cd frontend
npm run test
```

## Building for Production

### Backend
```bash
cd backend
npm run build
```

### Frontend
```bash
cd frontend
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.