import { Router } from "express";

import { authController } from "./auth.controller.js";

const router = Router();

router.post("/register", (req, res, next) =>
  authController.register(req, res, next),
);

export default router;