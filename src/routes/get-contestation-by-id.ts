import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleContestationRepository } from '../infrastructure/db/cruds/drizzle-contestation-repository';

export const getContestationByIdRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/contestation/:id',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'getContestationById',
        tags: ['contestation'],
        description: 'Get a contestation by ID',
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
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
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const drizzleOrm = new DrizzleContestationRepository();
      const contestation = await drizzleOrm.selectById(id);

      if (!contestation) {
        return reply
          .status(404)
          .send({ message: 'Contestation não encontrada' });
      }

      return reply.status(200).send(contestation);
    }
  );
};
