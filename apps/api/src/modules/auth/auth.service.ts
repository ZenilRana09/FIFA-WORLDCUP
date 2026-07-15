import bcrypt from "bcrypt";

import { authRepository } from "./auth.repository.js";
import { generateAccessToken } from "../../common/lib/jwt.js";
import type { RegisterInput } from "./auth.validation.js";

export class AuthService {
  async register(data: RegisterInput) {
    const existingUser = await authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await authRepository.createUser({
      name: data.name,
      email: data.email,
      passwordHash,
    });

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    };
  }
}

export const authService = new AuthService();