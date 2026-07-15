import { prisma } from "../../common/lib/prisma.js";

export class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: {
    name: string;
    email: string;
    passwordHash: string;
  }) {
    return prisma.user.create({
      data,
    });
  }
}

export const authRepository = new AuthRepository();