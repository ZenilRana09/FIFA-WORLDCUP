import request from "supertest";
import { describe, it, expect, vi } from "vitest";
import app from "../src/app.js";

vi.mock("../src/modules/ai/ai.service.js", () => ({
  aiService: {
    analyzeIncident: vi.fn().mockResolvedValue({
      risk: "HIGH",
      priority: 9,
      summary: "Crowd surge detected",
      recommendedActions: ["Deploy security"],
      estimatedResolutionTime: "15 minutes",
    }),
  },
}));

describe("AI Routes", () => {
  it("POST /api/ai/analyze should return success", async () => {
    const res = await request(app).post("/api/ai/analyze").send({
      title: "Crowd Surge",
      description: "Crowd density increasing",
      location: "Gate A",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.risk).toBe("HIGH");
  });
});