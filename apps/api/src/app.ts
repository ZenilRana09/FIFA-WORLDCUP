import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { env } from "./common/config/env.js";

import { healthRoutes } from "./modules/health/index.js";
import { authRoutes } from "./modules/auth/index.js";
import { incidentRoutes } from "./modules/incidents/index.js";
import { aiRoutes } from "./modules/ai/index.js";

import { notFound } from "./common/middleware/notFound.middleware.js";
import { errorHandler } from "./common/middleware/error.middleware.js";

const app = express();

/**
 * Security Headers
 */
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
  })
);

/**
 * Rate Limiter
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", limiter);

/**
 * CORS
 */
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/**
 * Logging
 */
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

/**
 * Body Parsers
 */
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

/**
 * Root Route
 */
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    project: "FIFA SmartStadium AI",
    version: "1.0.0",
    status: "Running",
  });
});

/**
 * API Routes
 */
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/ai", aiRoutes);

/**
 * 404 Handler
 */
app.use(notFound);

/**
 * Global Error Handler
 */
app.use(errorHandler);

export default app;