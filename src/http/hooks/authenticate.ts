import type { FastifyReply, FastifyRequest } from 'fastify';

function parseCookies(cookieHeader?: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  // biome-ignore lint/complexity/noForEach: <explanation>
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.split('=');
    if (!name) return;
    cookies[name.trim()] = rest.join('=').trim();
  });
  return cookies;
}

export async function authenticateUserHook(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization;
    const cookies = parseCookies(request.headers.cookie);
    const token = authHeader?.split(' ')[1] || cookies['app-token'];

    if (!token) {
      throw new Error('Token não fornecido');
    }

    request.headers.authorization = `Bearer ${token}`;

    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized' });
  }
}
