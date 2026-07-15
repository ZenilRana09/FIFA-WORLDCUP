import type { AuthUser } from "../common/types/auth";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};