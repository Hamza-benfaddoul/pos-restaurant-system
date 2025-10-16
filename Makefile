.PHONY: help build up down restart logs clean seed install dev-backend dev-frontend test

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Docker commands
build: ## Build all Docker images
	docker-compose build

up: ## Start all services with Docker Compose
	docker-compose up -d

down: ## Stop all services
	docker-compose down

restart: ## Restart all services
	docker-compose restart

logs: ## View logs from all services
	docker-compose logs -f

clean: ## Remove all containers, volumes, and images
	docker-compose down -v
	docker system prune -f

# Database commands
seed: ## Seed the database with sample data (requires running backend)
	docker-compose exec backend npm run seed

# Installation commands
install: ## Install dependencies for both frontend and backend
	cd backend && npm install
	cd frontend && npm install

# Development commands
dev-backend: ## Start backend in development mode (requires PostgreSQL)
	cd backend && npm run start:dev

dev-frontend: ## Start frontend in development mode
	cd frontend && npm run dev

dev-db: ## Start only PostgreSQL for local development
	docker-compose -f docker-compose.dev.yml up -d

# Testing commands
test-backend: ## Run backend tests
	cd backend && npm test

test-frontend: ## Run frontend tests
	cd frontend && npm test

# Build commands
build-backend: ## Build backend application
	cd backend && npm run build

build-frontend: ## Build frontend application
	cd frontend && npm run build

# Quick commands
quick-start: up seed ## Quick start: Build, start, and seed the database
	@echo "Application is ready at http://localhost"
	@echo "Backend API is ready at http://localhost:3000/api"

quick-stop: down ## Quick stop: Stop all services

status: ## Show status of all services
	docker-compose ps
