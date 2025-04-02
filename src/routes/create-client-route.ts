import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleCredentialClientRepository } from '../infrastructure/db/cruds/drizzle-credential-client-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const createClientRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/client',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'createClient',
        tags: ['client'],
        description: 'Create a new Client',
        body: z.object({
          enterprise: z.string(),
          competenceMonth: z.string(),
          cnpj: z.string(),
          contestation: z.string(),
          returned: z.string(),
        }),
        response: {
          201: z.null(),

          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const drizzleOrm = new DrizzleCredentialClientRepository();

      const { enterprise, competenceMonth, cnpj, contestation, returned } =
        request.body;

      await drizzleOrm.createClient({
        enterprise,
        competenceMonth,
        cnpj,
        contestation,
        returned,
      });

      return reply.status(201).send();
    }
  );
};
