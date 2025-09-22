import "dotenv/config";
import express from "express";
import cors from "cors";
import { database } from "./config/database";
import authRoutes from "./routes/auth";

const app = express();

// Connect to database
database.connect().catch(error => {
  console.error('Failed to connect to database:', error);
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});