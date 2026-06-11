# Expense Tracker — Backend (Node.js / Express)

REST API for the Expense Tracker app. Handles user authentication and expense management, backed by MongoDB Atlas.

---

## Features

- User registration and login with bcrypt password hashing
- JWT-based authentication (7-day tokens)
- CRUD endpoints for expenses, scoped per user
- CORS-enabled for local development

---

## Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Runtime     | Node.js                       |
| Framework   | Express v5                    |
| Database    | MongoDB (via Mongoose)        |
| Auth        | JSON Web Tokens (jsonwebtoken)|
| Hashing     | bcryptjs                      |
| Language    | TypeScript (ts-node)          |

---

## Project Structure

```
src/
├── controllers/
│   ├── authController.ts      # Register & login logic
│   └── expenseController.ts   # CRUD for expenses
├── middleware/
│   └── authMiddleware.ts      # JWT verification
├── models/
│   ├── User.ts                # User schema with password hashing
│   └── Expense.ts             # Expense schema
└── routes/                    # Express route definitions
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or local MongoDB)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env

# 3. Fill in the values in .env (see Environment Variables below)

# 4. Start the development server
npm run dev
```

The server starts on `http://localhost:5000` by default.

---

## Environment Variables

Create a `.env` file in the project root. See `.env.example` for the required keys:

| Variable     | Description                              |
|--------------|------------------------------------------|
| `MONGO_URI`  | MongoDB connection string                |
| `PORT`       | Port the server listens on (default 5000)|
| `JWT_SECRET` | Secret key used to sign JWT tokens       |

---

## API Endpoints

### Auth

| Method | Endpoint             | Description         | Auth Required |
|--------|----------------------|---------------------|---------------|
| POST   | `/api/auth/register` | Register a new user | No            |
| POST   | `/api/auth/login`    | Login and get token | No            |

**Register / Login request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "token": "<jwt_token>",
  "user": { "_id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

---

### Expenses

All expense endpoints require the `Authorization: Bearer <token>` header.

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/expenses`       | Get all user expenses    |
| POST   | `/api/expenses`       | Create a new expense     |
| PUT    | `/api/expenses/:id`   | Update an expense        |
| DELETE | `/api/expenses/:id`   | Delete an expense        |

**Expense object:**
```json
{
  "title": "Grocery Shopping",
  "amount": 1500,
  "category": "Food",
  "date": "2025-06-10"
}
```

---

## Available Scripts

| Script        | Description                          |
|---------------|--------------------------------------|
| `npm run dev` | Start server with ts-node (dev mode) |

---

## License

MIT
