import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzlePartnerRepository } from '../infrastructure/db/cruds/drizzle-partner-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const createPartnerRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/partners',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'createPartner',
        tags: ['partners'],
        description: 'Create a new partner',
        body: z.object({
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
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const drizzleOrm = new DrizzlePartnerRepository();
      const {
        name,
        cpfOrCnpj,
        city,
        state,
        commission,
        portal,
        channelHead,
        regional,
        coordinator,
        agent,
        indicator,
        contract,
        phone,
        email,
        responsible,
      } = request.body;

      await drizzleOrm.create({
        name,
        cpfOrCnpj,
        city,
        state,
        commission,
        portal,
        channelHead,
        regional,
        coordinator,
        agent,
        indicator,
        contract,
        phone,
        email,
        responsible,
      });

      return reply.status(201).send();
    }
  );
};
