# POS Restaurant System

A modern Point of Sale (POS) system for restaurant management built with Node.js, Express, and PostgreSQL.

> **🚀 Quick Start**: New to the project? Check out [QUICKSTART.md](QUICKSTART.md) to get up and running in under 5 minutes!

## 🚀 Features

- RESTful API for restaurant operations
- PostgreSQL database with sample data
- Docker containerization for easy deployment
- Database management with pgAdmin
- Hot-reload development environment

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)

## 🛠️ Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/Hamza-benfaddoul/pos-restaurant-system.git
cd pos-restaurant-system
```

### 2. Create environment file

Copy the example environment file and customize if needed:

```bash
cp .env.example .env
```

Default environment variables:
- **Application Port**: 3000
- **PostgreSQL Port**: 5432
- **pgAdmin Port**: 5050
- **Database Name**: pos_restaurant
- **Database User**: postgres
- **Database Password**: postgres123

### 3. Start the application with Docker Compose

```bash
docker-compose up -d
```

This command will:
- Build the application Docker image
- Start PostgreSQL database
- Start pgAdmin for database management
- Initialize the database with sample data
- Start the Node.js application with hot-reload

### 4. Verify the services are running

Check the status of all services:

```bash
docker-compose ps
```

You should see three services running:
- `pos-app` - Application server
- `pos-postgres` - PostgreSQL database
- `pos-pgadmin` - Database management UI

### 5. Access the application

- **Application API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health
- **API Info**: http://localhost:3000/api
- **pgAdmin**: http://localhost:5050 (login with credentials from .env)

## 🧪 Testing the Setup

### Check application health

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-16T17:57:10.000Z",
  "environment": "development"
}
```

### Check API info

```bash
curl http://localhost:3000/api
```

## 📊 Database Management

### Using pgAdmin

1. Open http://localhost:5050 in your browser
2. Login with:
   - Email: `admin@pos.local` (or value from .env)
   - Password: `admin123` (or value from .env)
3. Add a new server:
   - Host: `postgres`
   - Port: `5432`
   - Database: `pos_restaurant`
   - Username: `postgres`
   - Password: `postgres123`

### Using psql (CLI)

Access the database directly:

```bash
docker-compose exec postgres psql -U postgres -d pos_restaurant
```

## 📝 Available Commands

### Start services in detached mode
```bash
docker-compose up -d
```

### Start services and view logs
```bash
docker-compose up
```

### Stop services
```bash
docker-compose down
```

### Stop services and remove volumes (⚠️ deletes all data)
```bash
docker-compose down -v
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f postgres
docker-compose logs -f pgadmin
```

### Rebuild containers
```bash
docker-compose up -d --build
```

### Restart a specific service
```bash
docker-compose restart app
```

## 🗂️ Project Structure

```
pos-restaurant-system/
├── src/
│   ├── config/
│   │   └── database.js       # Database configuration
│   ├── controllers/          # Request handlers
│   ├── models/              # Data models
│   ├── routes/              # API routes
│   └── index.js             # Application entry point
├── init-db/
│   └── 01-init.sql          # Database initialization script
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile               # Application Docker image
├── .dockerignore           # Docker ignore patterns
├── .gitignore              # Git ignore patterns
├── .env.example            # Example environment variables
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## 🔧 Development Workflow

The application supports hot-reloading in development mode. Any changes to files in the `src/` directory will automatically restart the server.

### Making code changes

1. Edit files in the `src/` directory
2. The application will automatically reload
3. View logs: `docker-compose logs -f app`

### Adding new npm packages

```bash
# Add a new package
docker-compose exec app npm install <package-name>

# Rebuild the container
docker-compose up -d --build
```

## 🐛 Troubleshooting

### Port already in use

If you see "port already in use" errors, either:
- Stop the conflicting service on your host machine
- Change the port mapping in `docker-compose.yml`

### Database connection issues

```bash
# Check if PostgreSQL is ready
docker-compose exec postgres pg_isready -U postgres

# View PostgreSQL logs
docker-compose logs postgres
```

### Container won't start

```bash
# Remove all containers and volumes
docker-compose down -v

# Rebuild and start
docker-compose up -d --build
```

### View detailed logs

```bash
docker-compose logs -f --tail=100 app
```

## 📦 Production Deployment

For production deployment, you should:

1. Create a production `docker-compose.prod.yml`
2. Use environment-specific `.env` files
3. Change default passwords and secrets
4. Use proper SSL/TLS certificates
5. Set `NODE_ENV=production`
6. Configure proper logging and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

ISC

## 👤 Author

Hamza Benfaddoul