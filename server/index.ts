import "dotenv/config";
import express from "express";
import cors from "cors";
import compression from "compression";
import path from "path";
import { handleDemo } from "./routes/demo";
import { database } from "./config/database";
import { securityHeaders, generalRateLimit, errorHandler, notFound } from "./middleware/security";

// Import routes
import authRoutes from "./routes/auth";
import servicesRoutes from "./routes/services";
import bookingsRoutes from "./routes/bookings";
import chatbotRoutes from "./routes/chatbot";
import chatRoutes from "./routes/chat";
import testAIRoutes from "./routes/test-ai";
import uploadRoutes from "./routes/upload";
import digilockerRoutes from "./routes/digilocker";

export function createServer() {
  const app = express();

  // Security middleware
  app.use(securityHeaders);
  app.use(compression());
  app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:8081",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  }));

  // Apply rate limiting only to API routes, not static assets
  app.use('/api', generalRateLimit);

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Health check endpoints
  app.get("/health", async (_req, res) => {
    try {
      const dbHealth = await database.ping();
      res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        database: dbHealth ? "connected" : "disconnected",
        environment: process.env.NODE_ENV || "development"
      });
    } catch (error) {
      res.status(503).json({
        status: "error",
        message: "Health check failed",
        timestamp: new Date().toISOString()
      });
    }
  });

  // API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Main API routes
  app.use("/api/auth", authRoutes);
  app.use("/api/verification", digilockerRoutes);
  app.use("/api/services", servicesRoutes);
  app.use("/api/bookings", bookingsRoutes);
  app.use("/api/chatbot", chatbotRoutes);
  app.use("/api/chat", chatRoutes);
  app.use("/api/test-ai", testAIRoutes);
  app.use("/api/upload", uploadRoutes);

  // Serve uploaded files
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  // Serve static files from public directory
  app.use(express.static("public"));

  // In production, serve the built React app
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("dist/spa"));
    
    // Handle client-side routing - serve index.html for all non-API routes
    app.get("*", (req, res) => {
      if (!req.path.startsWith("/api")) {
        res.sendFile(path.resolve("dist/spa/index.html"));
      } else {
        res.status(404).json({ success: false, message: `Route ${req.path} not found` });
      }
    });
  }

  // 404 handler for API routes only
  app.use("/api/*", notFound);

  // Error handling middleware (must be last)
  app.use(errorHandler);

  return app;
}
