import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import bcrypt from 'bcrypt';
import { DrizzleUserRepository } from '../infrastructure/db/cruds/drizzle-user-repository';

export const createUserRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/users',
    {
      schema: {
        operationId: 'createUser',
        tags: ['Users'],
        description: 'Create a new User',
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
          role: z.string(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            email: z.string().email(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const userRepository = new DrizzleUserRepository();
      const { email, password, role } = request.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await userRepository.create({
        email,
        passwordHash: hashedPassword,
        role,
      });

      if (!newUser) {
        return reply.status(400).send({ message: 'Erro ao criar usuário' });
      }

      return reply.status(201).send({ id: newUser.id, email: newUser.email });
    }
  );
};
