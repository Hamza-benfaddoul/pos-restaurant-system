# Contributing to POS Restaurant System

Thank you for your interest in contributing to the POS Restaurant System! This guide will help you get started.

## Getting Started

### Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)
- Git

### Setting Up Your Development Environment

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hamza-benfaddoul/pos-restaurant-system.git
   cd pos-restaurant-system
   ```

2. **Run the setup**
   ```bash
   make setup
   # or manually:
   cp .env.example .env
   ```

3. **Validate the setup**
   ```bash
   make validate
   # or manually:
   ./validate-setup.sh
   ```

4. **Start the development environment**
   ```bash
   make up
   # or manually:
   docker compose up -d
   ```

5. **Verify everything is working**
   ```bash
   curl http://localhost:3000/health
   ```

## Development Workflow

### Making Changes

1. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the `src/` directory

3. The application will automatically reload when you save files

4. View logs to see your changes:
   ```bash
   make logs-app
   # or manually:
   docker compose logs -f app
   ```

### Testing Your Changes

1. Run tests:
   ```bash
   make test
   ```

2. Test the API endpoints:
   ```bash
   # Health check
   curl http://localhost:3000/health
   
   # API info
   curl http://localhost:3000/api
   ```

### Database Changes

If you need to modify the database schema:

1. Update the SQL file: `init-db/01-init.sql`

2. Restart with a clean database:
   ```bash
   make clean  # Warning: This deletes all data
   make up
   ```

3. Or connect to the database and run migrations manually:
   ```bash
   make db-shell
   ```

## Useful Make Commands

```bash
make help         # Show all available commands
make setup        # Initial setup
make validate     # Validate Docker configuration
make up           # Start all services
make down         # Stop all services
make restart      # Restart all services
make logs         # View all logs
make logs-app     # View application logs
make logs-db      # View database logs
make shell        # Open shell in app container
make db-shell     # Open PostgreSQL shell
make clean        # Remove all containers and data
make rebuild      # Rebuild and restart
make status       # Check service status
```

## Code Style

- Use consistent indentation (2 spaces for JavaScript)
- Follow existing code patterns
- Add comments for complex logic
- Keep functions small and focused

## Commit Messages

Write clear, descriptive commit messages:

```
feat: add order management endpoint
fix: resolve database connection timeout
docs: update API documentation
refactor: simplify authentication logic
```

## Pull Request Process

1. Update documentation if needed
2. Ensure your code works with the Docker setup
3. Test thoroughly
4. Create a pull request with a clear description
5. Address any review comments

## Getting Help

- Check the [README.md](README.md) for setup instructions
- Review existing code for examples
- Open an issue for bugs or feature requests

## Project Structure

```
pos-restaurant-system/
├── src/                    # Application source code
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   └── index.js          # Application entry point
├── init-db/               # Database initialization
├── docker-compose.yml     # Docker Compose config
├── Dockerfile            # Docker image definition
├── Makefile              # Development commands
└── package.json          # Node.js dependencies
```

## Architecture

- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose
- **Development**: Hot-reload enabled

## Adding New Dependencies

```bash
# Add a package
docker compose exec app npm install <package-name>

# Update package.json and rebuild
make rebuild
```

## Troubleshooting

### Ports Already in Use

Change the port mappings in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Changed from 3000:3000
```

### Container Won't Start

View logs to diagnose:
```bash
make logs-app
```

### Database Connection Issues

Check if PostgreSQL is ready:
```bash
docker compose exec postgres pg_isready -U postgres
```

### Fresh Start

Remove everything and start over:
```bash
make clean
make up
```

## License

By contributing, you agree that your contributions will be licensed under the ISC License.
