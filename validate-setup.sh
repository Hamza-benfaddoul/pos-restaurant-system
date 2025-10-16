#!/bin/bash

# Docker Development Setup Validation Script
# This script validates that Docker and Docker Compose are properly configured

set -e

echo "================================"
echo "Docker Setup Validation Script"
echo "================================"
echo ""

# Check if Docker is installed
echo "1. Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "   ❌ Docker is not installed"
    exit 1
fi
echo "   ✓ Docker is installed: $(docker --version)"

# Check if Docker Compose is installed
echo ""
echo "2. Checking Docker Compose installation..."
if ! docker compose version &> /dev/null; then
    echo "   ❌ Docker Compose is not installed"
    exit 1
fi
echo "   ✓ Docker Compose is installed: $(docker compose version)"

# Check if .env file exists
echo ""
echo "3. Checking environment configuration..."
if [ ! -f .env ]; then
    echo "   ⚠ .env file not found, creating from .env.example..."
    cp .env.example .env
    echo "   ✓ Created .env file"
else
    echo "   ✓ .env file exists"
fi

# Validate docker-compose.yml
echo ""
echo "4. Validating docker-compose.yml syntax..."
if docker compose config --quiet; then
    echo "   ✓ docker-compose.yml is valid"
else
    echo "   ❌ docker-compose.yml has syntax errors"
    exit 1
fi

# Check required files
echo ""
echo "5. Checking required files..."
REQUIRED_FILES=(
    "Dockerfile"
    "package.json"
    "src/index.js"
    "src/config/database.js"
    "init-db/01-init.sql"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✓ $file exists"
    else
        echo "   ❌ $file is missing"
        exit 1
    fi
done

echo ""
echo "================================"
echo "✓ All validation checks passed!"
echo "================================"
echo ""
echo "You can now start the development environment with:"
echo "  docker compose up -d"
echo ""
echo "Access the services at:"
echo "  - Application: http://localhost:3000"
echo "  - Health Check: http://localhost:3000/health"
echo "  - pgAdmin: http://localhost:5050"
echo ""
