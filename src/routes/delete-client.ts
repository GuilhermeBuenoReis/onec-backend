import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleClientRepository } from '../infrastructure/db/cruds/drizzle-client-repository';

export const deleteClientRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/client/:id',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'deleteClient',
        tags: ['client'],
        description: 'Delete a client',
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
      const drizzleOrm = new DrizzleClientRepository();
      const deleted = await drizzleOrm.delete(id);

      if (!deleted) {
        return reply.status(404).send({ message: 'Cliente não encontrado' });
      }

      return reply
        .status(200)
        .send({ message: 'Cliente deletada com sucesso!' });
    }
  );
};
