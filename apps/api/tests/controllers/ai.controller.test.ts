import { describe, it, expect, vi, beforeEach } from "vitest";
import { aiController } from "../../src/modules/ai/ai.controller.js";
import { aiService } from "../../src/modules/ai/ai.service.js";

vi.mock("../../src/modules/ai/ai.service.js", () => ({
  aiService: {
    analyzeIncident: vi.fn(),
  },
}));

const mockResponse = () => {
  const res: any = {};

  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);

  return res;
};

describe("AI Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should analyze an incident successfully", async () => {
    const req: any = {
      body: {
        title: "Crowd Surge",
        description: "Crowd density increasing rapidly",
        location: "Gate A",
      },
    };

    const res = mockResponse();
    const next = vi.fn();

    const aiResult = {
      risk: "HIGH",
      priority: 9,
      summary: "Potential crowd surge detected.",
      recommendedActions: [
        "Deploy security",
        "Open additional gates",
      ],
      estimatedResolutionTime: "15 minutes",
    };

    (aiService.analyzeIncident as any).mockResolvedValue(aiResult);

    await aiController.analyze(req, res, next);

    expect(aiService.analyzeIncident).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: aiResult,
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("should call next when AI service throws an error", async () => {
    const req: any = {
      body: {},
    };

    const res = mockResponse();
    const next = vi.fn();

    const error = new Error("AI service failed");

    (aiService.analyzeIncident as any).mockRejectedValue(error);

    await aiController.analyze(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});