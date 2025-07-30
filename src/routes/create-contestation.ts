import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleContestationRepository } from '../infrastructure/db/cruds/drizzle-contestation-repository';

export const createContestationRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/contestation',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'createContestation',
        tags: ['contestation'],
        description: 'Create a new Contestation',
        body: z.object({
          product: z.string(),
          competence: z.string(),
          cnpj: z.string(),
          client: z.string(),
          percentage: z.number(),
          compensation: z.number(),
          honorary: z.number(),
          tax: z.number(),
          valueTj: z.number(),
          toPay: z.number(),
          status: z.string(),
          observation: z.string().nullable(),
        }),
        response: {
          201: z.null(),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const drizzleOrm = new DrizzleContestationRepository();
      const {
        product,
        competence,
        cnpj,
        client,
        percentage,
        compensation,
        honorary,
        tax,
        valueTj,
        toPay,
        status,
        observation,
      } = request.body;

      await drizzleOrm.create({
        product,
        competence,
        cnpj,
        client,
        percentage,
        compensation,
        honorary,
        tax,
        valueTj,
        toPay,
        status,
        observation,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return reply.status(201).send();
    }
  );
};
