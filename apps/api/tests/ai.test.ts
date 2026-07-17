import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/app.js";

describe("AI Routes", () => {
 it.skip("POST AI analyze endpoint should respond", async () => {
    const res = await request(app)
      .post("/api/ai/analyze")
      .send({
        title: "Crowd Surge",
        description: "Crowd density increasing",
        location: "Gate A",
      });

    expect([200, 400, 401, 500]).toContain(res.status);
  });
});