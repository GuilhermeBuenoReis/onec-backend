import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzlePendingRepository } from '../infrastructure/db/cruds/drizzle-pending-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const getPendingsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/pendings',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'getPendings',
        tags: ['pendings'],
        description: 'Get a list of pendings',
        response: {
          200: z.array(
            z.object({
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
            })
          ),
        },
      },
    },
    async (_, reply) => {
      const pendingRepository = new DrizzlePendingRepository();
      const pendings = await pendingRepository.select();

      return reply.status(200).send(pendings);
    }
  );
};
