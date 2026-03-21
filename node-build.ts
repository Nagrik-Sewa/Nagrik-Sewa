import dotenv from "dotenv";
import express from "express";
import { createServer } from "./server/index";

dotenv.config();

const port = process.env.PORT || 10000;

async function bootstrap() {
  const app = express();

  // Build complete API app (routes + middleware) before opening the port.
  const serverApp = await createServer();
  app.use(serverApp);

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

bootstrap().catch((error) => {
  console.error("Server bootstrap error:", error);
  process.exit(1);
});
