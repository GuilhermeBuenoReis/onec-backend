import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleCredentialRepository } from '../infrastructure/db/cruds/drizzle-credential-repository';

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
      const drizzleOrm = new DrizzleCredentialRepository();

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
