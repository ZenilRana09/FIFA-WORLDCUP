import { Request, Response, NextFunction } from "express";
import { aiService } from "./ai.service.js";

class AIController {
  async analyze(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("====================================");
      console.log("🤖 AI endpoint hit");
      console.log("Request Body:");
      console.log(req.body);
      console.log("====================================");

      const result = await aiService.analyzeIncident(req.body);

      console.log("✅ AI Response:");
      console.log(result);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("❌ AI Error:");
      console.error(error);

      next(error);
    }
  }
}

export const aiController = new AIController();