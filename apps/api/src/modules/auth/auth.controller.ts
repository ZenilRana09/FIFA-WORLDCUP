import type { Request, Response, NextFunction } from "express";

import { authService } from "./auth.service.js";
import { registerSchema } from "./auth.validation.js";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = registerSchema.parse(req.body);

      const result = await authService.register(data);

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();