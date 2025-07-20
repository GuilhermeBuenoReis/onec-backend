import { SignJWT } from 'jose';
import { env } from '../env';

export async function authenticateUser(userId: string): Promise<string> {
  const secret = new TextEncoder().encode(env.JWT_SECRET);

  const token = await new SignJWT()
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  return token;
}
