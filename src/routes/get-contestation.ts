import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleContestationRepository } from '../infrastructure/db/cruds/drizzle-contestation-repository';

export const getContestationRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/contestation',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'getContestation',
        tags: ['contestation'],
        description: 'Get a list of contestation',
        response: {
          200: z.array(
            z.object({
              id: z.string().nullable(),
              product: z.string().nullable(),
              competence: z.string().nullable(),
              cnpj: z.string().nullable(),
              client: z.string().nullable(),
              percentage: z.number().nullable(),
              compensation: z.number().nullable(),
              honorary: z.number().nullable(),
              tax: z.number().nullable(),
              valueTj: z.number().nullable(),
              toPay: z.number().nullable(),
              status: z.string().nullable(),
              observation: z.string().nullable(),
              createdAt: z.date().nullable(),
              updatedAt: z.date().nullable(),
            })
          ),
        },
      },
    },
    async (_, reply) => {
      const drizzleOrm = new DrizzleContestationRepository();
      const contestations = await drizzleOrm.select();
      return reply.status(200).send(contestations);
    }
  );
};
