import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleContractRepository } from '../infrastructure/db/cruds/drizzle-contract-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

const expectedStatuses = [
  'Ativos',
  'Finalizados',
  'Em Andamento',
  'Em migração',
];

export const getContractStatusCountRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/contract/status-count',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'getContractStatusCount',
        tags: ['contract'],
        description: 'Get contract status count',
        response: {
          200: z.array(
            z.object({
              status: z.string(),
              count: z.number(),
            })
          ),
        },
      },
    },
    async (_, reply) => {
      const drizzleOrm = new DrizzleContractRepository();
      const statusCounts = await drizzleOrm.selectStatusCount();

      const statusMap = new Map(
        statusCounts.map(item => [item.status, item.count])
      );

      const formattedResponse = expectedStatuses.map(status => ({
        status,
        count: statusMap.get(status) ?? 0,
      }));

      return reply.status(200).send(formattedResponse);
    }
  );
};
