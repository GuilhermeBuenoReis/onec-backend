import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleExelDataNegotiationRepository } from '../infrastructure/db/cruds/drizzle-negotiation-repository';

export const createDataNegotiationRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/negotiation',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'createDataNegotiation',
        tags: ['DataNegotiations'],
        description: 'Create a new DataNegotiation',
        body: z.object({
          title: z.string().nullable(),
          client: z.string().nullable(),
          user: z.string().nullable(),
          tags: z.string().nullable(),
          step: z.string().nullable(),
          status: z.string().nullable(),
          value: z.number().nullable(),
          partnerId: z.string().nullable(),
          startsDate: z.string().nullable(),
          observation: z.string().nullable(),
          averageGuide: z.number().nullable(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            name: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const drizzleOrm = new DrizzleExelDataNegotiationRepository();

      const {
        title,
        client,
        user,
        tags,
        step,
        status,
        value,
        startsDate,
        partnerId,
        observation,
        averageGuide,
      } = request.body;

      await drizzleOrm.create({
        title,
        client,
        user,
        tags,
        step,
        status,
        value,
        startsDate,
        observation,
        averageGuide,
        partnerId,
      });

      return reply.status(201).send();
    }
  );
};
