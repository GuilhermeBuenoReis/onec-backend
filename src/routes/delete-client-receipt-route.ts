import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleClientReceiptRepository } from '../infrastructure/db/cruds/drizzle-client-receipt-repository';
import { DrizzleClientRepository } from '../infrastructure/db/cruds/drizzle-client-repository';

export const deleteClientReceiptRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/client-receipt/:id',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'deleteClientReceipt',
        tags: ['clientReceipt'],
        description: 'Delete a client receipt',
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
      const drizzleOrm = new DrizzleClientReceiptRepository();
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
