import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleExelDataNegotiationRepository } from '../infrastructure/db/cruds/drizzle-data-negotiation-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const deleteNegotiationRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/negotiation/:id',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'deleteNegotiation',
        tags: ['negotiation'],
        description: 'Delete a negotiation',
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
      const drizzleOrm = new DrizzleExelDataNegotiationRepository();
      const deleted = await drizzleOrm.delete(id);

      if (!deleted) {
        return reply.status(404).send({ message: 'Negociação não encontrada' });
      }

      return reply
        .status(200)
        .send({ message: 'Negociação deletada com sucesso!' });
    }
  );
};
