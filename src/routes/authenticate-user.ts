import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import bcrypt from 'bcrypt';
import { generateToken } from '../config/jose';
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
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const userRepository = new DrizzleUserRepository();

      const user = await userRepository.findByEmail(email);
      if (!user) {
        return reply.status(401).send({ error: 'Credenciais inválidas' });
      }

      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        return reply.status(401).send({ error: 'Credenciais inválidas' });
      }

      const token = await generateToken({ id: user.id, role: user.role });

      return reply.status(200).send({ token });
    }
  );
};
