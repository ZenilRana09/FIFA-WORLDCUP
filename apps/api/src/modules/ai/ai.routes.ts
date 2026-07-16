import { Router } from "express";
import { aiController } from "./ai.controller.js";

const router = Router();

router.post(
  "/analyze",
  aiController.analyze.bind(aiController)
);

export default router;