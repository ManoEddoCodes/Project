# Ecommerce API
A simple Node.js and Express ecommerce API with MongoDB, supporting categories, products, cart, and orders.

## Features
- CRUD operations on categories
- CRUD operations on products
- Add, update, and remove cart items
- Create and view orders
- Error handling with a centralized middleware

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv
- Postman (for API testing)

## Project Structure

```bash
app.js
controllers/
db/
middlewares/
models/
routes/
postman/
scripts/
utils/
```

## Installation
1. Clone the repository
2. Initiate npm:

```bash
npm init -y
```

3. Install dependencies in the provided `package.json` file:

```bash
npm install
```

4. Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce
NODE_ENV=development
```

> Make sure your MongoDB server is running and the URI points to your database.

## Run the Server

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

## API Endpoints

### Categories
- `GET /api/categories`
- `POST /api/categories`
- `GET /api/categories/:id`
- `PUT /api/categories/:id`
- `DELETE /api/categories/:id`

### Products
- `GET /api/products`
- `POST /api/products`
- `GET /api/products/:id`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### Cart
- `GET /api/cart`
- `POST /api/cart`
- `PUT /api/cart/:productId`
- `DELETE /api/cart/:productId`

### Orders
- `GET /api/orders`
- `POST /api/orders`
- `GET /api/orders/:id`
- `PUT /api/orders/:id/status`

## Postman
This project includes Postman files in the `postman/` folder:
- `eccommerce-api.postman_environment.json`
- `eccommerce-api.postman_collection.json`

### Importing into Postman
1. Open Postman
2. Click Import
3. Import the environment file first
4. Then import the collection file
5. Select the environment before sending requests

## Seed Data
You can run the seed script to populate sample data:

```bash
npm run seed
```

## Notes
- The API uses `default_user` as the fallback user ID for cart and order operations.
- Make sure to start MongoDB before running the server.