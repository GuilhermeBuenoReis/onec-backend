import jwt from 'jsonwebtoken';
import { env } from '@/shared/env.js';

interface TokenPayload {
  id: string;
  role: string;
}

const EXPIRATION_IN_SECONDS = 60 * 60 * 24 * 60;

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: EXPIRATION_IN_SECONDS,
  });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
}
