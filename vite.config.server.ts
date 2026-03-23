import { defineConfig } from "vite";
import path from "path";

// Server build configuration
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "server/node-build.ts"),
      name: "server",
      fileName: "production",
      formats: ["es"],
    },
    outDir: "dist/server",
    target: "node22",
    ssr: true,
    rollupOptions: {
      external: [
        // Node.js built-ins
        "fs",
        "path",
        "url",
        "http",
        "https",
        "os",
        "crypto",
        "stream",
        "util",
        "events",
        "buffer",
        "querystring",
        "child_process",
        // External dependencies that should not be bundled
        "express",
        "cors",
        "compression",
        "dotenv",
        "morgan",
        "bcryptjs",
        "jsonwebtoken",
        "mongoose",
        "multer",
        "passport",
        "passport-local",
        "passport-jwt",
        "passport-google-oauth20",
        "redis",
        "nodemailer",
        "cloudinary",
        "socket.io",
        "socket.io-client",
        "axios",
        "uuid",
        "sharp",
        "joi",
        "express-validator",
        "express-rate-limit",
        "helmet",
        "crypto-js",
        "twilio",
        "razorpay",
        "winston",
        "node-cron",
        "qrcode",
        "@emailjs/nodejs",
        "@google/generative-ai",
        "google-auth-library",
        "i18next",
        "moment",
      ],
      output: {
        format: "es",
        entryFileNames: "production.mjs",
      },
    },
    minify: false, // Keep readable for debugging
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
