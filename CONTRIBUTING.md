# Contributing to POS Restaurant System

Thank you for your interest in contributing to the POS Restaurant System! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/pos-restaurant-system.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit and push to your fork
7. Create a Pull Request

## Development Setup

### Prerequisites
- Node.js 20 or higher
- Docker and Docker Compose
- Git

### Local Development

1. Start the development database:
   ```bash
   make dev-db
   ```

2. Start the backend in development mode:
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run start:dev
   ```

3. Start the frontend in development mode:
   ```bash
   cd frontend
   cp .env.example .env
   npm install
   npm run dev
   ```

## Code Style

### Backend (NestJS)
- Follow TypeScript best practices
- Use ESLint and Prettier configurations provided
- Run `npm run lint` before committing
- Run `npm run format` to auto-format code

### Frontend (React)
- Use functional components with hooks
- Follow React best practices
- Use ESLint configuration provided
- Keep components focused and reusable

## Commit Messages

Follow conventional commit format:
- `feat: Add new feature`
- `fix: Fix bug in component`
- `docs: Update documentation`
- `style: Format code`
- `refactor: Refactor module`
- `test: Add tests`
- `chore: Update dependencies`

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Ensure code follows style guidelines
5. Update CHANGELOG.md if applicable
6. Request review from maintainers

## API Guidelines

When adding new endpoints:
1. Follow RESTful conventions
2. Add proper validation using DTOs
3. Include error handling
4. Document the endpoint in README.md
5. Add tests for the endpoint

## Database Changes

When modifying entities:
1. Update TypeORM entities
2. Test migrations in development
3. Update seed script if needed
4. Document schema changes

## UI/UX Guidelines

When modifying the frontend:
1. Maintain responsive design
2. Ensure accessibility
3. Follow existing color scheme
4. Test on multiple browsers
5. Keep performance in mind

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about the codebase
- Suggestions for improvements

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
