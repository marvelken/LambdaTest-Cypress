# How to Install Cypress for Testing Needs

A simple Express.js application with Cypress end-to-end tests for demonstrating automated testing capabilities.

## Features

- **User Management**: CRUD operations for managing users
- **Contact Form**: Form submission with validation
- **Multi-page Navigation**: Test routing between pages
- **RESTful API**: JSON endpoints for testing API calls

## Quick Start
```bash
# Install dependencies
npm install

# Run tests (starts server + runs Cypress)
npm test

# Open Cypress Test Runner
npm run test:open

# Run server only
npm start
```

## Test Files

- `cypress/e2e/first-test.cy.js` - Basic app functionality tests
- `cypress/e2e/selenium-ecommerce.cy.js` - E-commerce flow example

## Tech Stack

- Express.js 5.x
- Cypress 14.x
- Node.js

## Project Structure
```
├── server.js              # Express server
├── cypress/
│   ├── e2e/              # Test files
│   ├── fixtures/         # Test data
│   └── support/          # Custom commands
└── cypress.config.js     # Cypress configuration
```

## Available Routes

- `/` - Home page
- `/users` - User management
- `/contact` - Contact form
- `/about` - About page
- `/api/users` - Users API endpoint
