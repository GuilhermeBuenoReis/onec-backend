import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleExelDataNegotiationRepository } from '../infrastructure/db/cruds/drizzle-negotiation-repository';

export const updateNegotiationRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/negotiation/:id',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'updateNegotiation',
        tags: ['negotiation'],
        description: 'Update a Negotiation',
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          title: z.string().nullable().optional(),
          client: z.string().nullable().optional(),
          user: z.string().nullable().optional(),
          tags: z.string().nullable().optional(),
          step: z.string().nullable().optional(),
          status: z.string().nullable().optional(),
          value: z.number().nullable().optional(),
          startsDate: z.string().nullable().nullable().optional(),
          partnerId: z.string().nullable().nullable().optional(),
          observation: z.string().nullable().nullable().optional(),
          averageGuide: z.number().nullable().nullable().optional(),
        }),
        response: {
          200: z.object({
            negotiation: z.object({
              id: z.string(),
              title: z.string().nullable(),
              client: z.string().nullable(),
              user: z.string().nullable(),
              tags: z.string().nullable(),
              step: z.string().nullable(),
              status: z.string().nullable(),
              value: z.number().nullable(),
              startsDate: z.string().nullable(),
              observation: z.string().nullable(),
              partnerId: z.string().nullable(),
              averageGuide: z.number().nullable(),
              createdAt: z.date().nullable(),
              updatedAt: z.date().nullable(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const drizzleOrm = new DrizzleExelDataNegotiationRepository();

      const updatedNegotiation = await drizzleOrm.update(id, request.body);

      if (!updatedNegotiation) {
        return reply.status(404).send({ message: 'Negociação não encontrada' });
      }

      return reply.status(200).send({ negotiation: updatedNegotiation });
    }
  );
};
