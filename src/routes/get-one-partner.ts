import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzlePartnerRepository } from '../infrastructure/db/cruds/drizzle-partner-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const getOnePartnerRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/partners/:id',
    {
      schema: {
        operationId: 'getOnePartner',
        tags: ['partners'],
        description: 'Get a single partner by id',
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            name: z.string().nullable(),
            cpfOrCnpj: z.string().nullable(),
            city: z.string().nullable(),
            state: z.string().nullable(),
            commission: z.number().nullable(),
            portal: z.string().nullable(),
            channelHead: z.string().nullable(),
            regional: z.string().nullable(),
            coordinator: z.string().nullable(),
            agent: z.string().nullable(),
            indicator: z.string().nullable(),
            contract: z.string().nullable(),
            phone: z.string().nullable(),
            email: z.string().nullable(),
            responsible: z.string().nullable(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const partnerRepository = new DrizzlePartnerRepository();
      const partner = await partnerRepository.selectOnePartner(id);
      if (!partner) {
        return reply.status(404).send({ message: 'Partner not found' });
      }
      return reply.status(200).send(partner);
    }
  );
};
