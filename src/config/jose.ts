import type { FastifyInstance } from 'fastify';

export function authenticateUser(
  app: FastifyInstance,
  user: { id: string; email: string; role: string }
) {
  return app.jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    { expiresIn: '7d' }
  );
}
