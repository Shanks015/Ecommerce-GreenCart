# GreenCart - E-Commerce Platform

GreenCart is a full-stack e-commerce application built with React, Node.js, Express, and MongoDB. It features a customer-facing shop and a seller/admin panel for product management.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB instance)
- A [Cloudinary](https://cloudinary.com/) account for image uploads
- A [Stripe](https://stripe.com/) account for payment processing

## Project Structure

- `/server`: Node.js/Express backend
- `/client`: React frontend (Vite)

## Setup and Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd greencart
```

### 2. Environment Configuration

Create a `.env` file in the **root** directory and add the following:

```env
MONGODB_URI="your_mongodb_connection_string"
NODE_ENV="development"
JWT_SECRET="your_jwt_secret"

# Admin Credentials
SELLER_EMAIL="admin@ex.com"
SELLER_PASSWORD="admin123"

# Cloudinary Setup
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Stripe Setup
STRIPE_WEBHOOK_KEY="your_stripe_webhook_key"
STRIPE_SECRET_KEY="your_stripe_secret_key"
```

Create a `.env` file in the **client** directory:

```env
VITE_BACKEND_URL="http://localhost:4000"
VITE_CURRENCY="$"
```

### 3. Install Dependencies

Install root and server dependencies:
```bash
npm install
```

Install client dependencies:
```bash
cd client
npm install
cd ..
```

## Running the Project

### Development Mode

To run both the server and client concurrently for development:

1. **Start the Backend Server**:
   From the root directory:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:4000`.

2. **Start the Frontend Client**:
   From the `client` directory:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

### Production Build

To build the client for production:
```bash
npm run build
```
The server is configured to serve the built client from the `client/dist` directory.

## Accessing the Panels

- **Main Storefront**: [http://localhost:5173/](http://localhost:5173/)
- **Seller/Admin Panel**: [http://localhost:5173/seller](http://localhost:5173/seller)
  - **Email**: `admin@ex.com`
  - **Password**: `admin123`

## Troubleshooting

- **Database Connection**: If you encounter DNS SRV errors with MongoDB Atlas, ensure your network allows DNS lookups for `_mongodb._tcp` records or try using the standard `mongodb://` connection string.
- **CORS Errors**: If the frontend cannot communicate with the backend, ensure `http://localhost:5173` is added to the `allowedOrigins` in `server/server.js`.
