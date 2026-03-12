# Supply Chain Management System

A full-stack Supply Chain Management System built using **Node.js**, **Express.js**, **MySQL**, and **React**.

---

## Overview

This project helps manage suppliers, products, warehouses, inventory, orders, shipments, and analytics in a single system. It demonstrates database design, REST API development, JWT authentication, transaction handling, and a React frontend dashboard.

---

## Features

- User authentication with JWT
- Supplier management
- Product management
- Inventory tracking
- Order processing with transactions
- Shipment tracking
- Analytics for top-selling products
- MySQL views, triggers, stored procedures, and indexes
- React frontend dashboard

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- JWT (jsonwebtoken)
- bcryptjs
- Morgan

### Frontend
- React
- Axios
- React Router DOM

---

## Project Structure

```
supply-chain-management-system/
├── server.js
├── package.json
├── README.md
├── .gitignore
├── .env.example
├── config/
├── controllers/
├── routes/
├── middleware/
├── sql/
│   ├── schema.sql
│   ├── sample_data.sql
│   ├── indexes.sql
│   ├── views.sql
│   ├── triggers.sql
│   └── procedures.sql
├── frontend/
├── docs/
└── screenshots/
```

---

## ER Diagram

![ER Diagram](./docs/er-diagram.png)

---

## Frontend Screenshots

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Products
![Products](./screenshots/products.png)

### Inventory
![Inventory](./screenshots/inventory.png)

### Orders
![Orders](./screenshots/orders.png)

### Analytics
![Analytics](./screenshots/analytics.png)

---

## Backend Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env` file

Create a `.env` file in the root folder based on `.env.example`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=supply_chain
DB_PORT=3306
JWT_SECRET=your_jwt_secret
```

### 3. Run SQL files in MySQL Workbench

Run the files from the `sql/` folder **in this order**:

1. `schema.sql`
2. `sample_data.sql`
3. `indexes.sql`
4. `views.sql`
5. `triggers.sql`
6. `procedures.sql`

### 4. Start the backend server

```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

---

## Frontend Setup

Open a new terminal and run:

```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |

### Suppliers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/suppliers` | Get all suppliers |
| POST | `/api/suppliers` | Add a new supplier |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Add a new product |
| GET | `/api/products/search?name=keyword` | Search products by name |

### Inventory
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/inventory` | Get all inventory records |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get all orders |
| POST | `/api/orders` | Create a new order |
| POST | `/api/orders/place` | Place an order with items (uses transaction) |

### Shipments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/shipments` | Get all shipments |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/top-products` | Get top-selling products |

---

## Sample Request Bodies

### Register User
```json
{
  "name": "Dhanush",
  "email": "dhanush@test.com",
  "password": "123456"
}
```

### Login
```json
{
  "email": "dhanush@test.com",
  "password": "123456"
}
```

### Add Product
```json
{
  "product_name": "Monitor",
  "category": "Electronics",
  "price": 12000,
  "supplier_id": 1
}
```

### Place Order
```json
{
  "customer_id": 1,
  "warehouse_id": 1,
  "items": [
    {
      "product_id": 1,
      "quantity": 1,
      "price": 75000
    },
    {
      "product_id": 2,
      "quantity": 2,
      "price": 500
    }
  ]
}
```

---

## Future Improvements

- Role-based access control (Admin / Staff)
- Dashboard cards with KPIs and charts
- Docker support for easy deployment
- Swagger / OpenAPI documentation
- Deployment to cloud (AWS / Railway / Render)

---

## Author

**Dhanush**
