import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleContractRepository } from '../infrastructure/db/cruds/drizzle-contract-repository';

export const getContractStatusCountRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/contract/status-count',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'getContractStatusCount',
        tags: ['contract'],
        description: 'Get count of contracts by status',
        response: {
          200: z.array(
            z.object({
              status: z.string().nullable(),
              count: z.number(),
            })
          ),
        },
      },
    },
    async (_, reply) => {
      const drizzleOrm = new DrizzleContractRepository();
      const statusCounts = await drizzleOrm.selectCountStatus();

      const formattedStatusCounts = statusCounts.map(item => ({
        status: item.status,
        count: Number(item.count),
      }));

      return reply.status(200).send(formattedStatusCounts);
    }
  );
};
