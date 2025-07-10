import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { authenticateUserController } from '../controllers/authenticate-user-controller.js';
import { env } from '@/shared/env.js';

export const authenticateUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/api/auth/login',
    {
      schema: {
        operationId: 'authenticateUser',
        tags: ['auth'],
        description: 'Autentica um usuário e retorna o token via cookie',
        body: z.object({
          email: z.email(),
          password: z.string().min(6),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;

      const result = await authenticateUserController({ email, password });

      if (!result) {
        return reply.status(401).send({ message: 'Credenciais inválidas' });
      }

      const { token } = result;

      reply.setCookie('app-token', token, {
        path: '/',
        httpOnly: true,
        sameSite: true,
        secure: env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      });

      return reply.status(200).send({ message: 'Autenticado com sucesso' });
    }
  );
};
