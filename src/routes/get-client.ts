import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleClientRepository } from '../infrastructure/db/cruds/drizzle-client-repository';

export const getClientRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/client',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'getClient',
        tags: ['client'],
        description: 'Get a list of client',
        response: {
          200: z.array(
            z.object({
              enterprise: z.string().nullable(),
              competenceMonth: z.string().nullable(),
              cnpj: z.string().nullable(),
              contestation: z.string().nullable(),
              returned: z.string().nullable(),
              product: z.string().nullable(),
            })
          ),
        },
      },
    },
    async (_, reply) => {
      const DrizzleOrm = new DrizzleClientRepository();
      const client = await DrizzleOrm.select();
      return reply.status(200).send(client);
    }
  );
};
