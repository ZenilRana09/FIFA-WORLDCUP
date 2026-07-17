import { Request, Response, NextFunction } from "express";
import { aiService } from "./ai.service.js";

class AIController {
  async analyze(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await aiService.analyzeIncident(req.body);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const aiController = new AIController();