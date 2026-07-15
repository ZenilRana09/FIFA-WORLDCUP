import type { Request, Response, NextFunction } from "express";

import { registerSchema } from "./auth.validation.js";
import { authService } from "./auth.service.js";

export class AuthController {
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