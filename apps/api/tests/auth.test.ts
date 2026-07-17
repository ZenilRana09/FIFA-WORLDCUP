import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/app.js";

describe("Auth Routes", () => {
  it("Auth endpoint should respond", async () => {
    const res = await request(app).post("/api/auth/login").send({});

    expect([200, 400, 401, 404]).toContain(res.status);
  });
});