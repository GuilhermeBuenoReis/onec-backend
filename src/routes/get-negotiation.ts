import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzlePartnerRepository } from '../infrastructure/db/cruds/drizzle-partner-repository';
import { DrizzleExelDataNegotiationRepository } from '../infrastructure/db/cruds/drizzle-data-negotiation-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const getNegotiationRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/negotiation',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'getNegotiation',
        tags: ['negotiation'],
        description: 'Get a list of Negotiation',
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              title: z.string(),
              client: z.string(),
              user: z.string(),
              tags: z.string(),
              step: z.string().nullable(),
              status: z.string(),
              value: z.number().nullable(),
              startsDate: z.string().nullable(),
              observation: z.string().nullable(),
              averageGuide: z.number().nullable(),
            })
          ),
        },
      },
    },
    async (_, reply) => {
      const drizzleOrm = new DrizzleExelDataNegotiationRepository();
      const negotiations = await drizzleOrm.select();

      return reply.status(200).send(negotiations);
    }
  );
};
