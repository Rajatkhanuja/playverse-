import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import GameRouter from "./routes/GameRoute.js";
import userRouter from "./routes/userRoute.js";

import "dotenv/config"
import CartRouter from "./routes/CartRoute.js";
import PurchaseRouter from "./routes/PurchaseRoute.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static('uploads'));

// Connect to database
connectDB();

// Routes
app.use("/api/game", GameRouter);
app.use("/api/user", userRouter);
app.use("/api/cart",CartRouter);
app.use("/api/Purchase",PurchaseRouter);
app.use("/api/admin",adminRouter);

// Default route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ success: false, message: 'Something broke!', error: err.message });
});

// Start server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
