import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();

console.log("PORT VALUE:", process.env.PORT);

mongoose
	.connect(process.env.MONGO_URI as string)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log("Mongo error:", err));

const port = process.env.PORT || 10000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

// Mount the existing application routes/middleware asynchronously.
import("./server/index.ts")
	.then(async ({ createServer }) => {
		const serverApp = await createServer();
		app.use(serverApp);
	})
	.catch((error) => {
		console.log("Server bootstrap error:", error);
	});
