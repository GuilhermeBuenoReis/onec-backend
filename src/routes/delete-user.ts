import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleUserRepository } from '../infrastructure/db/cruds/drizzle-user-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const deleteUserRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/users/:id',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'deleteUser',
        tags: ['Users'],
        description: 'Delete an existing User',
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const userRepository = new DrizzleUserRepository();

      const deleted = await userRepository.delete(id);

      if (!deleted) {
        return reply.status(400).send({ message: 'Erro ao excluir usuário' });
      }

      return reply
        .status(200)
        .send({ message: 'Usuário excluído com sucesso' });
    }
  );
};
