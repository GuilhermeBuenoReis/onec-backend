import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzlePendingRepository } from '../infrastructure/db/cruds/drizzle-pending-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const updatePendingRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/pendings/:id',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'updatePending',
        tags: ['pendings'],
        description: 'Update a pending',
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          client: z.string().nullable().optional(),
          callReason: z.string().nullable().optional(),
          status: z
            .enum(['Aberto', 'Encaminhado', 'Pendente', 'Concluído'])
            .nullable()
            .optional(),
          priority: z.string().nullable().optional(),
          responsible: z.string().nullable().optional(),
          category: z
            .enum([
              'SAC',
              'Atendimento',
              'Financeiro',
              'Diretoria',
              'Comercial',
              'Auditoria',
            ])
            .nullable()
            .optional(),
          description: z.string().nullable().optional(),
        }),
        response: {
          200: z.object({
            id: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const pendingRepository = new DrizzlePendingRepository();
      const updatedPending = await pendingRepository.update(id, request.body);

      if (!updatedPending) {
        return reply.status(404).send({ message: 'Parceiro não encontrado' });
      }

      return reply.status(200).send({
        id: updatedPending.id,
      });
    }
  );
};
