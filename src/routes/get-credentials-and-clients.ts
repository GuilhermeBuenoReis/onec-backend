import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleCredentialClientRepository } from '../infrastructure/db/cruds/drizzle-credential-client-repository';

export const getCredentialClientRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/credential-client',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'listCredentialClient',
        tags: ['credential', 'client'],
        description:
          'Lista os pares de credential e client agregados em um array JSON, com um novo id para cada objeto',
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              credentials: z.object({
                id: z.string(),
                channelHead: z.string().nullable(),
                partner: z.string().nullable(),
                cnpj: z.string().nullable(),
                agentIndicator: z.string().nullable(),
              }),
              clients: z.object({
                id: z.string(),
                enterprise: z.string(),
                competenceMonth: z.string(),
                cnpj: z.string(),
                contestation: z.string(),
                returned: z.string(),
              }),
            })
          ),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const drizzleOrm = new DrizzleCredentialClientRepository();

      const executedResult = await drizzleOrm.selectCredentialsAndClients();

      const response = executedResult.map((row: any) => {
        const contestation = row.contestation;
        return {
          id: contestation.id,
          credentials: contestation.credential,
          clients: contestation.client,
        };
      });

      return reply.status(200).send(response);
    }
  );
};
