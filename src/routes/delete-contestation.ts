import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleContestationRepository } from '../infrastructure/db/cruds/drizzle-contestation-repository';

export const deleteContestationRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/contestation/:id',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'deleteContestation',
        tags: ['contestation'],
        description: 'Delete a contestation',
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
      const drizzleOrm = new DrizzleContestationRepository();
      const deleted = await drizzleOrm.delete(id);

      if (!deleted) {
        return reply
          .status(404)
          .send({ message: 'Contestation não encontrada' });
      }

      return reply
        .status(200)
        .send({ message: 'Contestation deletada com sucesso!' });
    }
  );
};
