import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleContractRepository } from '../infrastructure/db/cruds/drizzle-contract-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const getContractStatusCountByFilter: FastifyPluginAsyncZod =
  async app => {
    app.post(
      '/contract/status-filter',
      {
        // onRequest: [authenticateUserHook],
        schema: {
          operationId: 'getContractStatusByFilter',
          tags: ['contract'],
          description: 'Get count of contracts by status by Filter',
          body: z.object({
            filter: z.string(),
          }),
          response: {
            200: z.array(
              z.object({
                id: z.string().nullable(),
                status: z.string().nullable(),
                count: z.number().nullable(),
              })
            ),
          },
        },
      },
      async (request, reply) => {
        const { filter } = request.body;
        const drizzleOrm = new DrizzleContractRepository();
        const statusCountFilter = await drizzleOrm.selectStatusFilter(filter);

        return reply.status(200).send(statusCountFilter);
      }
    );
  };
