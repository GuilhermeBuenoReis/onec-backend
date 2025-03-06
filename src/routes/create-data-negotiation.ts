import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleExelDataNegotiationRepository } from '../infrastructure/db/cruds/drizzle-data-negotiation-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const createDataNegotiationRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/negotiation',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'createDataNegotiation',
        tags: ['DataNegotiations'],
        description: 'Create a new DataNegotiation',
        querystring: z.object({
          id: z.string(),
        }),
        body: z.object({
          title: z.string(),
          client: z.string(),
          user: z.string(),
          tags: z.string(),
          step: z.string(),
          status: z.string(),
          value: z.number(),
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
        observation,
        averageGuide,
      } = request.body;
      const partnerId = request.query.id;

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
