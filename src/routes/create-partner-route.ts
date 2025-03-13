import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzlePartnerRepository } from '../infrastructure/db/cruds/drizzle-partner-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const createPartnerRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/partners',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'createPartner',
        tags: ['partners'],
        description: 'Create a new partner',
        body: z.object({
          name: z.string(),
          cpfOrCnpj: z.string(),
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
        response: {
          201: z.object({
            id: z.string(),
            name: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const partnerRepository = new DrizzlePartnerRepository();
      const partner = await partnerRepository.create(request.body);

      if (!partner?.id && !partner?.name) {
        throw new Error('Erro ao cadastrar parceiro');
      }

      return reply.status(201).send({
        id: partner.id,
        name: partner.name,
      });
    }
  );
};
