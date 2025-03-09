# NestJS OPN Restful API

A RESTful API service built with NestJS, PostgreSQL, and TypeORM that provides an interface bridging frontend and data source for commerce services.

## Overview

- 🔐 **User Authentication**
  - Registration with email validation
  - Secure login with token-based authentication
  - Password change functionality with validation

- 👤 **User Profile Management**
  - View profile information
  - Update allowed profile fields
  - Account deletion (PDPA compliance)

- 🛡️ **Security**
  - Password hashing with bcrypt
  - Authorization header verification
  - Input validation for all endpoints

- 📚 **Documentation**
  - Swagger API documentation
  - Comprehensive code documentation

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: Bearer token (mock implementation)
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive token

### User Management

- `GET /users/profile` - Get user profile information
- `PATCH /users/profile` - Update user profile
- `PATCH /users/password` - Change user password
- `DELETE /users/profile` - Soft-delete user profile

## Installation

### Prerequisites

- Node.js (v20+)
- npm or yarn
- PostgreSQL (v12+)

### Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/TrongtrongJ/opn-restful-api.git
   cd nest-commerce-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Rename `.env.example` file in the project root to `.env` and fill in the variables

4. Start the application:
   ```bash
   # Development mode
   npm run start:dev

   # Production mode
   npm run build
   npm run start:prod
   ```

## Using Docker

The project includes Docker configuration for easy deployment:

```bash
# Start the application with PostgreSQL
docker-compose up

# Stop the containers
docker-compose down
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:
```
http://localhost:3000/api-docs
```

## Testing

```bash
# Run unit tests
npm run test

# Run test coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## Authentication

The API uses mock token-based authentication. To access protected endpoints, include the token in the request header:

```
Authorization: Bearer faketoken_user1
```

In a production environment, this would be replaced with proper JWT implementation.

## Project Structure

```
src/
├── auth/               # Authentication module
│   ├── dto/            # Data transfer objects
│   ├── guards/         # Authentication guards
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── user/               # User module
│   ├── dto/            # Data transfer objects
│   ├── entities/       # Database entities
│   ├── user.controller.ts
│   ├── user.module.ts
│   └── user.service.ts
├── app.module.ts       # Main application module
└── main.ts             # Application entry point
```

## Notes for Developers

- **Database**: The application is configured to work with PostgreSQL, but the connection is mocked for this boilerplate.
- **Validation**: All DTOs have validation rules. Make sure inputs conform to these rules to avoid validation errors.
- **Error Handling**: The API returns appropriate HTTP status codes and error messages for various error scenarios.
- **Testing**: Sample tests are provided to demonstrate how to test the application.

## License

[MIT](LICENSE)