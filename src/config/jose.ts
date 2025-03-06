import { SignJWT } from 'jose';
import { env } from '../env';

export async function generateToken(
  payload: Record<string, any>
): Promise<string> {
  const secret = new TextEncoder().encode(env.JWT_SECRET);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('60d')
    .sign(secret);

  return token;
}
