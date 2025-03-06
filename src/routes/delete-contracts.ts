import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleContractRepository } from '../infrastructure/db/cruds/drizzle-contract-repository';

export const deleteContractRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/contract/:id',
    {
      schema: {
        operationId: 'deletePartner',
        tags: ['contract'],
        description: 'Delete a contract',
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
      const drizzleOrm = new DrizzleContractRepository();
      const deleted = await drizzleOrm.delete(id);

      if (!deleted) {
        return reply.status(404).send({ message: 'Contrato não encontrada' });
      }

      return reply
        .status(200)
        .send({ message: 'Contrato deletado com sucesso!' });
    }
  );
};
