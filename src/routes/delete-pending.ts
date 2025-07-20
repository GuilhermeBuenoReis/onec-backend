import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzlePendingRepository } from '../infrastructure/db/cruds/drizzle-pending-repository';

export const deletePendingRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/pendings/:id',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'deletePending',
        tags: ['pendings'],
        description: 'Delete a pending',
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const pendingRepository = new DrizzlePendingRepository();
      const deleted = await pendingRepository.delete(id);

      if (!deleted) {
        return reply.status(404).send({ message: 'Pendência não encontrado' });
      }

      return reply
        .status(200)
        .send({ message: 'Pendência deletado com sucesso' });
    }
  );
};
