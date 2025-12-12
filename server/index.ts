import "dotenv/config";
import express from "express";
import cors from "cors";
import compression from "compression";
import path from "path";
import morgan from "morgan";
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
import resumeRoutes from "./routes/resume";
import statsRoutes from "./routes/stats";
import { performanceMonitor, memoryMonitor, requestSizeMonitor, endpointMonitor, getPerformanceStats } from "./middleware/performance";

// Performance monitoring
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

export function createServer() {
  const app = express();

  // Initialize database connection with retry logic
  database.connect().catch(error => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });

  // Trust proxy for proper IP detection behind reverse proxies
  app.set('trust proxy', 1);

  // Request logging middleware
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  // Security middleware
  app.use(securityHeaders);
  app.use(compression({ threshold: 1024 })); // Only compress responses > 1KB
  
  // Enhanced CORS configuration
  app.use(cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.FRONTEND_URL || "http://localhost:8080",
        "http://localhost:8081",
        "http://localhost:3000", // For development
      ];
      
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-API-Key'],
    exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
    maxAge: 86400, // 24 hours
  }));

  // Apply rate limiting only to API routes, not static assets
  app.use('/api', generalRateLimit);

  // Performance monitoring middleware
  app.use(performanceMonitor);
  app.use(memoryMonitor);
  app.use(requestSizeMonitor);
  app.use('/api', endpointMonitor);

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

  // System metrics endpoint (protected)
  app.get("/metrics", async (req, res) => {
    try {
      // Basic auth for metrics endpoint in production
      if (process.env.NODE_ENV === 'production') {
        const auth = req.headers.authorization;
        const expectedAuth = process.env.METRICS_AUTH_TOKEN;
        
        if (!auth || !expectedAuth || auth !== `Bearer ${expectedAuth}`) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
      }
      
      const stats = getPerformanceStats();
      const dbHealth = await database.ping();
      
      res.status(200).json({
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: dbHealth,
        performance: stats,
        system: {
          nodeVersion: process.version,
          platform: process.platform,
          arch: process.arch,
          cpuUsage: process.cpuUsage(),
          memoryUsage: process.memoryUsage(),
        }
      });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unknown error',
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
  app.use("/api/resume", resumeRoutes);
  app.use("/api/stats", statsRoutes);

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
