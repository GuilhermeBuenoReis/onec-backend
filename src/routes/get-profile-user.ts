import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleUserRepository } from '../infrastructure/db/cruds/drizzle-user-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const getProfileUser: FastifyPluginAsyncZod = async app => {
  app.get(
    '/users',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'listUsers',
        tags: ['Users'],
        description: 'List all Users',
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              email: z.string().email(),
              role: z.string(),
            })
          ),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const userRepository = new DrizzleUserRepository();
      const users = await userRepository.select();
      return reply.status(200).send(users);
    }
  );
};
