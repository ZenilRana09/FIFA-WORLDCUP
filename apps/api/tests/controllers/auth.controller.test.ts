import { describe, it, expect, vi, beforeEach } from "vitest";
import { authController } from "../../src/modules/auth/auth.controller.js";
import { authService } from "../../src/modules/auth/auth.service.js";

vi.mock("../../src/modules/auth/auth.service.js", () => ({
  authService: {
    register: vi.fn(),
  },
}));

const mockResponse = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe("Auth Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should register a user successfully", async () => {
    const req: any = {
      body: {
        name: "Zenil",
        email: "zenil@test.com",
        password: "Password123!",
      },
    };

    const res = mockResponse();
    const next = vi.fn();

    const user = {
      id: "1",
      name: "Zenil",
      email: "zenil@test.com",
    };

    (authService.register as any).mockResolvedValue(user);

    await authController.register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "User registered successfully",
      data: user,
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("should call next when service throws", async () => {
    const req: any = {
      body: {
        name: "Zenil",
        email: "zenil@test.com",
        password: "Password123!",
      },
    };

    const res = mockResponse();
    const next = vi.fn();

    const error = new Error("Registration failed");

    (authService.register as any).mockRejectedValue(error);

    await authController.register(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
