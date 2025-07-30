import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { DrizzleUserRepository } from '../infrastructure/db/cruds/drizzle-user-repository';

export const authenticateUserRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/login',
    {
      schema: {
        operationId: 'authenticateUser',
        tags: ['Authentication'],
        description:
          'Realiza o login do usuário e retorna o token JWT com validade de 60 dias',
        body: z.object({
          email: z.email(),
          password: z.string(),
        }),
        response: {
          200: z.object({
            success: z.boolean(),
            token: z.string(),
          }),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const user_repository = new DrizzleUserRepository();
      const result = await user_repository.authenticateUserByEmailAndPassword(
        app,
        email,
        password
      );

      if ('message' in result) {
        return reply.status(401).send({ message: result.message });
      }

      reply
        .setCookie('onec_token', result.token, {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7,
        })
        .status(200)
        .send({ token: result.token, success: true });
    }
  );
};
