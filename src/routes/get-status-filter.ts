import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleContractRepository } from '../infrastructure/db/cruds/drizzle-contract-repository';

export const getContractStatusCountByFilterRoute: FastifyPluginAsyncZod =
  async app => {
    app.post(
      '/contract/status-count/filter',
      {
        schema: {
          onRequest: [authenticateUserHook],
          operationId: 'getContractStatusCountByFilter',
          tags: ['contract'],
          description: 'Get count of contracts by status using a filter',
          body: z.object({
            filter: z.string(),
          }),
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
      async (request, reply) => {
        const { filter } = request.body as { filter: string };
        const drizzleOrm = new DrizzleContractRepository();
        const rows = await drizzleOrm.selectStatusFilter(filter);
        const aggregated: Record<
          string,
          { status: string | null; count: number }
        > = {};
        rows.forEach(row => {
          const key = row.status !== null ? row.status.toLowerCase() : 'null';
          if (!aggregated[key])
            aggregated[key] = { status: row.status, count: 0 };
          aggregated[key].count++;
        });

        return reply.status(200).send(Object.values(aggregated));
      }
    );
  };
