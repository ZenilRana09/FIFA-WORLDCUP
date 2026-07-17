import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/app.js";

describe("Health API", () => {
  it("GET / should return project information", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.project).toBe("FIFA SmartStadium AI");
    expect(res.body.status).toBe("Running");
  });

  it("GET /api/health should return 200", async () => {
    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});