import bcrypt from 'bcrypt';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUser } from '../config/jose';
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
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          200: z.object({
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
      const authenticate_user =
        await user_repository.authenticateUserByEmailAndPassword(
          email,
          password
        );
      const token = authenticate_user.token;

      if (!token) {
        reply.status(401).send({ message: 'Token não gerado, ou quebrado!' });
        return;
      }

      reply
        .setCookie('token', token, {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7,
        })
        .status(200)
        .send({ token });
    }
  );
};
