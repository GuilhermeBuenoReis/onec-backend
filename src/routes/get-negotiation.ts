import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleExelDataNegotiationRepository } from '../infrastructure/db/cruds/drizzle-negotiation-repository';

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
              title: z.string().nullable(),
              client: z.string().nullable(),
              user: z.string().nullable(),
              tags: z.string().nullable(),
              step: z.string().nullable(),
              status: z.string(),
              value: z.number().nullable(),
              startsDate: z.string().nullable(),
              observation: z.string().nullable(),
              averageGuide: z.number().nullable(),
              partnerId: z.string().nullable(),
            })
          ),
        },
      },
    },
    async (_, reply) => {
      const drizzleOrm = new DrizzleExelDataNegotiationRepository();
      const negotiations = await drizzleOrm.select();

      const formattedNegotiations = negotiations.map(item => ({
        ...item,
        status: item.status ?? '',
      }));

      return reply.status(200).send(formattedNegotiations);
    }
  );
};
