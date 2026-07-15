import jwt from "jsonwebtoken";

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  });
}