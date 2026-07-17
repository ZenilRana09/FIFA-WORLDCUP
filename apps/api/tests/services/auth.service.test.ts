import { beforeEach, describe, expect, it, vi } from "vitest";
import bcrypt from "bcrypt";

vi.mock("bcrypt", () => ({
  default: {
    hash: vi.fn(),
  },
}));

vi.mock("../../src/modules/auth/auth.repository.js", () => ({
  authRepository: {
    findByEmail: vi.fn(),
    createUser: vi.fn(),
  },
}));

vi.mock("../../src/common/lib/jwt.js", () => ({
  generateAccessToken: vi.fn(),
}));

import { AuthService } from "../../src/modules/auth/auth.service.js";
import { authRepository } from "../../src/modules/auth/auth.repository.js";
import { generateAccessToken } from "../../src/common/lib/jwt.js";

describe("AuthService", () => {
  const service = new AuthService();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("registers a new user", async () => {
    vi.mocked(authRepository.findByEmail).mockResolvedValue(null);

    vi.mocked(bcrypt.hash).mockResolvedValue("hashed-password" as never);

    vi.mocked(authRepository.createUser).mockResolvedValue({
      id: "1",
      name: "Zenil",
      email: "zenil@test.com",
      role: "ADMIN",
    } as any);

    vi.mocked(generateAccessToken).mockReturnValue("token");

    const result = await service.register({
      name: "Zenil",
      email: "zenil@test.com",
      password: "password123",
    });

    expect(result.user.email).toBe("zenil@test.com");
    expect(result.accessToken).toBe("token");
    expect(authRepository.findByEmail).toHaveBeenCalledOnce();
    expect(authRepository.createUser).toHaveBeenCalledOnce();
  });

  it("throws when email already exists", async () => {
    vi.mocked(authRepository.findByEmail).mockResolvedValue({
      id: "1",
    } as any);

    await expect(
      service.register({
        name: "Zenil",
        email: "zenil@test.com",
        password: "password123",
      })
    ).rejects.toThrow("Email already exists");
  });
});
