import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzlePendingRepository } from '../infrastructure/db/cruds/drizzle-pending-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const getOnePendingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/pending/:id',
    {
      schema: {
        operationId: 'getOnePending',
        tags: ['pendings'],
        description: 'Get a single pending by id',
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            client: z.string().nullable(),
            callReason: z.string().nullable(),
            status: z
              .enum(['Aberto', 'Encaminhado', 'Pendente', 'Concluído'])
              .nullable(),
            priority: z.string().nullable(),
            responsible: z.string().nullable(),
            category: z
              .enum([
                'SAC',
                'Atendimento',
                'Financeiro',
                'Diretoria',
                'Comercial',
                'Auditoria',
              ])
              .nullable(),
            description: z.string().nullable(),
            createdAt: z.date().optional(),
            updatedAt: z.date().optional(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const pendingRepository = new DrizzlePendingRepository();
      const pending = await pendingRepository.selectOnePending(id);
      if (!pending) {
        return reply.status(404).send({ message: 'Pending not found' });
      }
      return reply.status(200).send(pending);
    }
  );
};
