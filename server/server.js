import express from "express";
import cors from "cors";
import 'dotenv/config'
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

try {
    console.log("Connecting to Database...");
    await connectDB();
    console.log("Database connected successfully.");
} catch (error) {
    console.error("Database connection failed:", error.message);
    console.log("Continuing without database connection for UI testing...");
}

try {
    console.log("Connecting to Cloudinary...");
    await connectCloudinary();
    console.log("Cloudinary connected successfully.");
} catch (error) {
    console.error("Cloudinary connection failed:", error.message);
}

console.log("Services initialized (with potential failures).");

const allowedOrigins = ['https://ecommerce-greencart-1.onrender.com/', 'http://localhost:5173'];

app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// API Endpoints
app.get('/', (req, res) => res.send("API Working"));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// Serve frontend
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));
