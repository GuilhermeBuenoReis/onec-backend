import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleCredentialClientRepository } from '../infrastructure/db/cruds/drizzle-credential-client-repository';

interface CredentialClientData {
  contestation: {
    id: string;
    credential: {
      id: string;
      channelHead: string | null;
      partner: string | null;
      cnpj: string | null;
      agentIndicator: string | null;
    };
    client: {
      id: string;
      enterprise: string;
      competenceMonth: string;
      cnpj: string;
      contestation: string;
      returned: string;
    };
  };
}

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

      const result =
        (await drizzleOrm.selectCredentialsAndClients()) as CredentialClientData;
      const { contestation } = result;

      const response = [
        {
          id: contestation.id,
          credentials: contestation.credential,
          clients: contestation.client,
        },
      ];

      return reply.status(200).send(response);
    }
  );
};
