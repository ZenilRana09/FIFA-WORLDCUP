import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/app.js";

describe("Incident Routes", () => {
  it(
    "GET incidents should respond",
    async () => {
      const res = await request(app).get("/api/incidents");

      expect([200, 401, 404]).toContain(res.status);
    },
    15000 // 15 second timeout
  );
});