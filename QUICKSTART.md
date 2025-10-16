# Quick Start Guide

Get the POS Restaurant System running in under 5 minutes!

## Prerequisites

- Docker (20.10+)
- Docker Compose (2.0+)

Don't have Docker? [Install Docker](https://docs.docker.com/get-docker/)

## Step 1: Clone & Setup

```bash
# Clone the repository
git clone https://github.com/Hamza-benfaddoul/pos-restaurant-system.git
cd pos-restaurant-system

# Create environment file
cp .env.example .env
```

## Step 2: Start the Application

```bash
# Using Make (recommended)
make up

# Or using Docker Compose directly
docker compose up -d
```

## Step 3: Verify It's Running

```bash
# Check health
curl http://localhost:3000/health

# Check API
curl http://localhost:3000/api
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-16T17:57:10.000Z",
  "environment": "development"
}
```

## Accessing the Services

| Service | URL | Credentials |
|---------|-----|-------------|
| Application API | http://localhost:3000 | - |
| Health Check | http://localhost:3000/health | - |
| pgAdmin | http://localhost:5050 | Email: admin@pos.local<br>Password: admin123 |
| PostgreSQL | localhost:5432 | User: postgres<br>Password: postgres123<br>Database: pos_restaurant |

## Common Commands

```bash
# View logs
make logs-app

# Stop services
make down

# Restart services
make restart

# Open database shell
make db-shell

# See all commands
make help
```

## Sample Database

The database is automatically initialized with sample data:
- 4 categories (Appetizers, Main Courses, Desserts, Beverages)
- 8 sample products
- Complete order management tables

## Troubleshooting

### Port Already in Use?

Edit `docker-compose.yml` and change the ports:
```yaml
ports:
  - "3001:3000"  # Change 3000 to any available port
```

### Services Not Starting?

```bash
# View logs to diagnose
docker compose logs -f

# Clean start
make clean
make up
```

### Database Issues?

```bash
# Check if PostgreSQL is ready
docker compose exec postgres pg_isready -U postgres

# View database logs
make logs-db
```

## Next Steps

- Read the [README.md](README.md) for detailed documentation
- Check [CONTRIBUTING.md](CONTRIBUTING.md) to start developing
- Explore the API endpoints
- Connect pgAdmin to visualize the database

## Need Help?

- Check the logs: `make logs`
- Validate setup: `make validate`
- Open an issue on GitHub

---

**That's it!** You now have a fully functional POS restaurant system running locally with Docker. 🎉
