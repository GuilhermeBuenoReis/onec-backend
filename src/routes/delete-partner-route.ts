import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzlePartnerRepository } from '../infrastructure/db/cruds/drizzle-partner-repository';

export const deletePartnerRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/partners/:id',
    {
      schema: {
        operationId: 'deletePartner',
        tags: ['partners'],
        description: 'Delete a partner',
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
      const partnerRepository = new DrizzlePartnerRepository();
      const deleted = await partnerRepository.delete(id);

      if (!deleted) {
        return reply.status(404).send({ message: 'Parceiro não encontrado' });
      }

      return reply
        .status(200)
        .send({ message: 'Parceiro deletado com sucesso' });
    }
  );
};
