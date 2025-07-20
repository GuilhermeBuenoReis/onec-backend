import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleExelDataNegotiationRepository } from '../infrastructure/db/cruds/drizzle-negotiation-repository';

export const getNegotiationByIdRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/negotiation/:id',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'getNegotiationById',
        tags: ['negotiation'],
        description: 'Get a list of Negotiation by id',
        params: z.object({
          id: z.string(),
        }),
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
    async (request, reply) => {
      const { id } = request.params;
      const drizzleOrm = new DrizzleExelDataNegotiationRepository();
      const negotiations = await drizzleOrm.selectById(id);

      const formattedNegotiations = negotiations.map(item => ({
        ...item,
        status: item.status ?? '',
      }));

      return reply.status(200).send(formattedNegotiations);
    }
  );
};
