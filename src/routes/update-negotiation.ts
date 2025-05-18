import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzlePartnerRepository } from '../infrastructure/db/cruds/drizzle-partner-repository';
import { DrizzleExelDataNegotiationRepository } from '../infrastructure/db/cruds/drizzle-negotiation-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

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
          title: z.string().optional(),
          client: z.string().optional(),
          user: z.string().optional(),
          tags: z.string().optional(),
          step: z.string().optional(),
          status: z.string().optional(),
          value: z.number().optional(),
          startsDate: z.string().nullable().optional(),
          observation: z.string().nullable().optional(),
          averageGuide: z.number().nullable().optional(),
        }),
        response: {
          200: z.object({
            title: z.string().nullable(),
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
        return reply.status(404).send({ message: 'Parceiro não encontrado' });
      }

      return reply.status(200).send({
        title: updatedNegotiation.title,
      });
    }
  );
};
