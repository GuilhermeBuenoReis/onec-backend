import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleClientRepository } from '../infrastructure/db/cruds/drizzle-client-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const updateClientRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/client/:id',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'updateClient',
        tags: ['client'],
        description: 'Update a client',
        params: z.object({
          id: z.string(),
        }),
        body: z
          .object({
            enterprise: z.string().nullable(),
            competenceMonth: z.string().nullable(),
            cnpj: z.string().nullable(),
            contestation: z.string().nullable(),
            returned: z.string().nullable(),
            product: z.string().nullable(),
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
      const repo = new DrizzleClientRepository();
      const updated = await repo.update(id, request.body);

      if (!updated) {
        return reply.status(404).send({ message: 'Cliente não encontrado' });
      }

      return reply
        .status(200)
        .send({ message: 'Cliente atualizada com sucesso!' });
    }
  );
};
