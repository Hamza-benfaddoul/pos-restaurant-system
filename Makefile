.PHONY: help setup build up down restart logs clean test validate

# Default target
help:
	@echo "Available commands:"
	@echo "  make setup      - Initial setup (copy .env.example to .env)"
	@echo "  make validate   - Validate Docker setup configuration"
	@echo "  make build      - Build Docker images"
	@echo "  make up         - Start all services"
	@echo "  make down       - Stop all services"
	@echo "  make restart    - Restart all services"
	@echo "  make logs       - View logs from all services"
	@echo "  make logs-app   - View logs from application service"
	@echo "  make logs-db    - View logs from database service"
	@echo "  make clean      - Stop services and remove volumes (deletes data)"
	@echo "  make shell      - Open shell in application container"
	@echo "  make db-shell   - Open PostgreSQL shell"
	@echo "  make test       - Run tests"

# Initial setup
setup:
	@echo "Setting up development environment..."
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "✓ Created .env file from .env.example"; \
	else \
		echo "✓ .env file already exists"; \
	fi
	@echo "✓ Setup complete!"

# Validate Docker configuration
validate:
	@./validate-setup.sh

# Build Docker images
build:
	docker compose build

# Start all services
up:
	docker compose up -d
	@echo ""
	@echo "Services are starting..."
	@echo "Wait a moment, then access:"
	@echo "  - Application: http://localhost:3000"
	@echo "  - Health Check: http://localhost:3000/health"
	@echo "  - pgAdmin: http://localhost:5050"

# Start services and show logs
up-logs:
	docker compose up

# Stop all services
down:
	docker compose down

# Restart all services
restart:
	docker compose restart

# View logs from all services
logs:
	docker compose logs -f

# View logs from application service
logs-app:
	docker compose logs -f app

# View logs from database service
logs-db:
	docker compose logs -f postgres

# Stop services and remove volumes
clean:
	@echo "⚠️  WARNING: This will delete all data!"
	@echo "Press Ctrl+C to cancel, or Enter to continue..."
	@read confirm
	docker compose down -v
	@echo "✓ All services and volumes removed"

# Open shell in application container
shell:
	docker compose exec app sh

# Open PostgreSQL shell
db-shell:
	docker compose exec postgres psql -U postgres -d pos_restaurant

# Run tests (placeholder)
test:
	docker compose exec app npm test

# Quick restart of just the app (useful for development)
restart-app:
	docker compose restart app

# Check service status
status:
	docker compose ps

# Pull latest images
pull:
	docker compose pull

# Rebuild and restart
rebuild:
	docker compose up -d --build
