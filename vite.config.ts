import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
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
    outDir: "dist/spa",
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
        const app = createServer();
        console.log("Express server loaded successfully");
        
        // Add Express app as middleware to Vite dev server
        server.middlewares.use(app);
        console.log("Express middleware added to Vite");
      } catch (error) {
        console.error("Failed to load Express server:", error);
      }
    },
  };
}
