import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import cors from "cors";
import path from "path";

// https://vitejs.dev/config/
const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:5173",
  "https://nagrik-sewa.vercel.app"
];

const corsMiddleware = cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Blocked by CORS: " + origin));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
});
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./", "./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist",
  },
  plugins: [react(), mode === 'development' ? expressPlugin() : undefined].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    async configureServer(server) {
      try {
        console.log("Loading Express server...");
        const { createServer } = await import("./server");
        const app = await createServer();
        console.log("Express server loaded successfully");
        
        // Apply CORS to Vite middleware FIRST
        server.middlewares.use(corsMiddleware);
        
        // Add Express app as middleware to Vite dev server
        server.middlewares.use(app);
        console.log("Express middleware added to Vite");
      } catch (error) {
        console.error("Failed to load Express server:", error);
      }
    },
  };
}
