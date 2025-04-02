import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleCredentialClientRepository } from '../infrastructure/db/cruds/drizzle-credential-client-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const createCredentialRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/credential',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'createCredential',
        tags: ['credential'],
        description: 'Create a new Credential',
        body: z.object({
          channelHead: z.string().nullable(),
          cnpj: z.string().nullable(),
          agentIndicator: z.string().nullable(),
          partner: z.string().nullable(),
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

      const { channelHead, cnpj, agentIndicator, partner } = request.body;

      await drizzleOrm.createCredential({
        channelHead,
        cnpj,
        agentIndicator,
        partner,
      });

      return reply.status(201).send();
    }
  );
};
