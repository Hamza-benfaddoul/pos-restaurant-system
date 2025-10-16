# System Architecture

## Overview

The POS Restaurant System follows a three-tier architecture with containerized services.

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│                    http://localhost                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Port 80)                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              React + Vite Application                 │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │  Components                                      │ │  │
│  │  │  - CashierPage (main interface)                 │ │  │
│  │  │  - Product display with categories              │ │  │
│  │  │  - Shopping cart                                │ │  │
│  │  │  - Order management                             │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │  Services                                        │ │  │
│  │  │  - API client (Axios)                           │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│                     Nginx (Reverse Proxy)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP REST API
                         │ /api/*
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend (Port 3000)                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              NestJS Application                       │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │  Controllers                                     │ │  │
│  │  │  - CategoriesController                         │ │  │
│  │  │  - ProductsController                           │ │  │
│  │  │  - OrdersController                             │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │  Services (Business Logic)                      │ │  │
│  │  │  - CategoriesService                            │ │  │
│  │  │  - ProductsService                              │ │  │
│  │  │  - OrdersService                                │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │  Entities (TypeORM)                             │ │  │
│  │  │  - Category                                     │ │  │
│  │  │  - Product                                      │ │  │
│  │  │  - Order                                        │ │  │
│  │  │  - OrderItem                                    │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ TypeORM / SQL
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database (Port 5432)               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Tables                                               │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │  │
│  │  │ categories  │  │  products   │  │   orders    │  │  │
│  │  ├─────────────┤  ├─────────────┤  ├─────────────┤  │  │
│  │  │ - id        │  │ - id        │  │ - id        │  │  │
│  │  │ - name      │  │ - name      │  │ - number    │  │  │
│  │  │ - desc      │  │ - desc      │  │ - status    │  │  │
│  │  │ - active    │  │ - price     │  │ - subtotal  │  │  │
│  │  └─────────────┘  │ - image     │  │ - tax       │  │  │
│  │                   │ - available │  │ - total     │  │  │
│  │                   │ - category  │  │ - payment   │  │  │
│  │                   └─────────────┘  │ - customer  │  │  │
│  │                                    └─────────────┘  │  │
│  │                   ┌─────────────┐                   │  │
│  │                   │ order_items │                   │  │
│  │                   ├─────────────┤                   │  │
│  │                   │ - id        │                   │  │
│  │                   │ - quantity  │                   │  │
│  │                   │ - price     │                   │  │
│  │                   │ - subtotal  │                   │  │
│  │                   │ - order     │                   │  │
│  │                   │ - product   │                   │  │
│  │                   └─────────────┘                   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Create Order Flow

```
User Action → Frontend → Backend → Database
    |            |          |          |
    1. Add       2. POST    3. Validate  4. Insert
    products     /api/      product      order +
    to cart      orders     availability  items
    |            |          |          |
    5. ←────── Response ←── Business ←── Success
              (Order ID)    Logic
                           (Calculate
                            tax, total)
```

### 2. View Products Flow

```
User Action → Frontend → Backend → Database
    |            |          |          |
    1. Select    2. GET     3. Query   4. Return
    category     /api/      with       products
                products    filters
    |            |          |          |
    4. ←────── Response ←── Format ←── Data
              (Products)    data
```

## Component Interactions

### Frontend Components

- **CashierPage**: Main interface coordinating all cashier operations
- **Product Grid**: Displays products with category filtering
- **Cart**: Manages order items and quantities
- **Checkout**: Handles payment method and order completion

### Backend Modules

- **Categories Module**: Manages product categories
- **Products Module**: Manages menu items with pricing
- **Orders Module**: Handles order creation, status, and history

### Database Relations

```
Category (1) ──── (N) Product
Product (1) ──── (N) OrderItem
Order (1) ──── (N) OrderItem
```

## Technology Stack Details

### Frontend Stack
- **React 18**: UI library
- **Vite**: Fast build tool
- **Axios**: HTTP client
- **CSS3**: Styling (no framework for minimal footprint)

### Backend Stack
- **NestJS 11**: Node.js framework
- **TypeORM 0.3**: ORM
- **PostgreSQL**: Database
- **Class Validator**: Input validation

### Infrastructure
- **Docker**: Container runtime
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Reverse proxy and static file serving

## Deployment Architecture

### Development
```
Host Machine
├── Backend (npm run start:dev) → localhost:3000
├── Frontend (npm run dev) → localhost:5173
└── PostgreSQL (Docker) → localhost:5432
```

### Production (Docker Compose)
```
Docker Network
├── Frontend Container (Nginx) → Port 80
├── Backend Container (Node.js) → Port 3000
└── PostgreSQL Container → Port 5432
    └── Volume: postgres_data
```

## Security Considerations

- CORS enabled for frontend-backend communication
- Input validation on all endpoints
- SQL injection prevention via TypeORM
- Environment variables for sensitive data
- No hardcoded credentials

## Scalability Options

1. **Horizontal Scaling**: Deploy multiple backend instances behind a load balancer
2. **Database Replication**: Add read replicas for PostgreSQL
3. **Caching**: Add Redis for frequently accessed data
4. **CDN**: Serve static frontend assets via CDN
5. **Microservices**: Split modules into separate services as needed
