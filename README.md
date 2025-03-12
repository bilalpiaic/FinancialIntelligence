
# Accounting & Finance Management System

A modern web application for managing accounting, finance, and donation records. Built with TypeScript, React, Express, PostgreSQL and Drizzle ORM.

## Overview

This application provides a complete solution for managing:
- Chart of accounts
- Voucher entries (journal, payment, receipt)
- Party (customer/supplier) records
- Donor management 
- User authentication and roles

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL database
- Drizzle ORM for database operations
- Passport.js for authentication

### Frontend
- React with TypeScript
- Shadcn/UI components (built on Radix UI)
- TailwindCSS for styling
- React Query for data fetching
- Wouter for routing

## Features

### Account Management
- Create and manage chart of accounts with hierarchical structure
- Group accounts by type (Asset, Liability, Equity, Income, Expense)
- Track account balances

### Voucher System
- Create different types of vouchers (Journal, Receipt, Payment)
- Record debit and credit entries
- Maintain transaction history

### Party Management
- Manage customer and supplier records
- Track party balances

### Donor Management
- Record donor information
- Track donation history

### User Management
- Secure authentication
- Role-based access control

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database

### Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your environment variables (database connection)
4. Start the development server:
   ```
   npm run dev
   ```
5. Access the application at http://localhost:5000

### Production Deployment

The application includes Docker configuration for easy deployment:

1. Build and start the containers:
   ```
   docker-compose up -d
   ```
2. Access the application at http://localhost:5000

## Project Structure

```
├── client             # Frontend React application
│   ├── src            # Source code
│   └── index.html     # Entry HTML file
├── migrations         # Database migration files
├── server             # Backend Express server
│   ├── auth.ts        # Authentication logic
│   ├── routes.ts      # API routes
│   ├── storage.ts     # Database operations
│   └── index.ts       # Server entry point
├── shared             # Shared code between client and server
│   └── schema.ts      # Database schema definitions
├── Dockerfile         # Docker configuration
├── docker-compose.yml # Docker Compose configuration
└── package.json       # Project dependencies
```

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - User login
- `POST /api/logout` - User logout

### Accounts
- `GET /api/accounts` - Get all accounts
- `POST /api/accounts` - Create a new account

### Vouchers
- `GET /api/vouchers` - Get all vouchers
- `GET /api/vouchers/:id` - Get a specific voucher with entries
- `POST /api/vouchers` - Create a new voucher
- `POST /api/voucher-entries` - Add entries to a voucher

### Parties
- `GET /api/parties` - Get all parties
- `POST /api/parties` - Create a new party

### Donors
- `GET /api/donors` - Get all donors
- `POST /api/donors` - Create a new donor

## Database Schema

### Users
Stores user authentication information and roles.

### Accounts
Chart of accounts with a hierarchical structure, categorized by type (Asset, Liability, Equity, Income, Expense).

### Vouchers
Records of financial transactions with metadata like date, description, and amount.

### Voucher Entries
Individual debit and credit entries associated with vouchers, linked to accounts.

### Parties
Customer and supplier information with running balances.

### Donors
Information about donors with their total donation amounts.

## Development

### Running Migrations
To apply database migrations:
```
npm run db:push
```

### Building for Production
```
npm run build
```

## Deployment with Docker

The application includes Docker configuration for containerized deployment:

1. The `Dockerfile` uses a multi-stage build process to create an optimized production image
2. `docker-compose.yml` configures the application and PostgreSQL database
3. Data persistence is handled through Docker volumes

To deploy with Docker:
```
docker-compose up -d
```

## License

MIT
