import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleContestationRepository } from '../infrastructure/db/cruds/drizzle-contestation-repository';

export const updateContestationRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/contestation/:id',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'updateContestation',
        tags: ['contestation'],
        description: 'Update a contestation',
        params: z.object({
          id: z.string(),
        }),
        body: z
          .object({
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
          })
          .partial(),
        response: {
          200: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const repo = new DrizzleContestationRepository();
      const updated = await repo.update(id, request.body);

      if (!updated) {
        return reply
          .status(404)
          .send({ message: 'Contestation não encontrada' });
      }

      return reply
        .status(200)
        .send({ message: 'Contestation atualizada com sucesso!' });
    }
  );
};
