import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzlePendingRepository } from '../infrastructure/db/cruds/drizzle-pending-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const createPendingRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/pendings',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'createPending',
        tags: ['pendings'],
        description: 'Create a new pending',
        body: z.object({
          client: z.string().nullable(),
          callReason: z.string().nullable(),
          status: z
            .enum(['Aberto', 'Encaminhado', 'Pendente', 'Concluído'])
            .nullable(),
          priority: z.string().nullable(),
          responsible: z.string().nullable(),
          category: z.enum([
            'SAC',
            'Atendimento',
            'Financeiro',
            'Diretoria',
            'Comercial',
            'Auditoria',
          ]),
          description: z.string().nullable(),
        }),
        response: {
          201: z.object({
            id: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const pendingRepository = new DrizzlePendingRepository();
      const pending = await pendingRepository.create(request.body);

      if (!pending?.id) {
        throw new Error('Erro ao cadastrar parceiro');
      }

      return reply.status(201).send({
        id: pending.id,
      });
    }
  );
};
