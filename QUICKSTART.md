# Quick Start Guide

This guide will help you quickly set up and run the POS Restaurant System.

## Option 1: Docker Compose (Recommended)

This is the easiest way to run the entire application with all services.

### Prerequisites
- Docker Desktop installed and running

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hamza-benfaddoul/pos-restaurant-system.git
   cd pos-restaurant-system
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```
   
   This will start:
   - PostgreSQL database on port 5432
   - Backend API on port 3000
   - Frontend on port 80

3. **Wait for services to start** (about 30-60 seconds)
   ```bash
   docker-compose logs -f
   ```
   Press Ctrl+C to stop viewing logs

4. **Access the application**
   - Open your browser and go to: http://localhost
   - The cashier interface will be displayed

5. **Seed the database with sample data**
   ```bash
   docker-compose exec backend npm run seed
   ```

6. **Stop the services**
   ```bash
   docker-compose down
   ```

## Option 2: Local Development

Run each service separately for development purposes.

### Prerequisites
- Node.js 20+ installed
- PostgreSQL installed (or use docker-compose.dev.yml for just the database)

### Steps

1. **Start PostgreSQL (using Docker)**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Set up Backend**
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run start:dev
   ```
   Backend will run on http://localhost:3000

3. **Seed the database** (in a new terminal)
   ```bash
   cd backend
   npm run seed
   ```

4. **Set up Frontend** (in a new terminal)
   ```bash
   cd frontend
   cp .env.example .env
   npm install
   npm run dev
   ```
   Frontend will run on http://localhost:5173

## Testing the Application

### Sample Workflow

1. **View Products**: The cashier page will display all available products grouped by categories
2. **Add to Cart**: Click on any product to add it to the cart
3. **Adjust Quantity**: Use + and - buttons to change quantities
4. **Filter by Category**: Click category buttons to filter products
5. **Complete Order**: 
   - Optionally enter customer name
   - Select payment method (Cash, Card, or Mobile)
   - Click "Complete Order"
6. **View Result**: You'll get a success message and the cart will clear

### API Testing

You can test the API directly using curl or Postman:

**Get all categories:**
```bash
curl http://localhost:3000/api/categories
```

**Get all products:**
```bash
curl http://localhost:3000/api/products
```

**Create an order:**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"productId": "PRODUCT_ID_HERE", "quantity": 2}
    ],
    "customerName": "John Doe",
    "paymentMethod": "cash"
  }'
```

**Get today's sales:**
```bash
curl http://localhost:3000/api/orders/today/sales
```

## Troubleshooting

### Port Already in Use

If you get a "port already in use" error:

**For port 80:**
```bash
# Change frontend port in docker-compose.yml
ports:
  - "8080:80"  # Change 80 to 8080 or another available port
```

**For port 3000:**
```bash
# Change backend port in docker-compose.yml
environment:
  PORT: 3001
ports:
  - "3001:3001"
```

### Database Connection Issues

If the backend can't connect to the database:

1. Check if PostgreSQL is running:
   ```bash
   docker-compose ps
   ```

2. Check backend logs:
   ```bash
   docker-compose logs backend
   ```

3. Restart services:
   ```bash
   docker-compose restart
   ```

### Frontend Can't Connect to Backend

1. Check if backend is running:
   ```bash
   curl http://localhost:3000/api/categories
   ```

2. For local development, ensure .env file exists in frontend:
   ```bash
   cd frontend
   cat .env
   # Should contain: VITE_API_URL=http://localhost:3000/api
   ```

3. Check nginx.conf proxy settings in Docker setup

## Default Test Data

After running the seed command, you'll have:

**Categories:**
- Appetizers
- Main Courses
- Desserts
- Beverages

**Sample Products:**
- Spring Rolls ($6.99)
- Chicken Wings ($8.99)
- Grilled Chicken ($15.99)
- Beef Burger ($12.99)
- Margherita Pizza ($13.99)
- Pasta Carbonara ($14.99)
- Chocolate Cake ($6.99)
- Ice Cream ($4.99)
- Coca Cola ($2.99)
- Coffee ($2.49)
- And more...

## Next Steps

- Customize products and categories through the API
- Add more features like user authentication
- Implement order history viewing
- Add receipt printing functionality
- Create admin dashboard for management

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review API documentation in the README
- Open an issue on GitHub for bugs or questions
