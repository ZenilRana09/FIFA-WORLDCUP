import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env.js";
import healthRouter from "./routes/health.route.js";
import { notFound } from "./middleware/notFound.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

// Logging
app.use(morgan("dev"));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    project: "FIFA SmartStadium AI",
    version: "1.0.0",
    status: "Running",
  });
});

// Health route
app.use("/api/health", healthRouter);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app;