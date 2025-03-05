import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzlePartnerRepository } from '../infrastructure/db/cruds/drizzle-partner-repository';

export const updatePartnerRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/partners/:id',
    {
      schema: {
        operationId: 'updatePartner',
        tags: ['partners'],
        description: 'Update a partner',
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          name: z.string().optional(),
          cpfOrCnpj: z.string().optional(),
          city: z.string().nullable().optional(),
          state: z.string().nullable().optional(),
          commission: z.number().nullable().optional(),
          portal: z.string().nullable().optional(),
          channelHead: z.string().nullable().optional(),
          regional: z.string().nullable().optional(),
          coordinator: z.string().nullable().optional(),
          agent: z.string().nullable().optional(),
          indicator: z.string().nullable().optional(),
          contract: z.string().nullable().optional(),
          phone: z.string().nullable().optional(),
          email: z.string().email().nullable().optional(),
          responsible: z.string().nullable().optional(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
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
      const updatedPartner = await partnerRepository.update(id, request.body);

      if (!updatedPartner) {
        return reply.status(404).send({ message: 'Parceiro não encontrado' });
      }

      return reply.status(200).send({
        id: updatedPartner.id,
        name: updatedPartner.name,
      });
    }
  );
};
