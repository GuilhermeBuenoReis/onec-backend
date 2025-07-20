import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleCredentialRepository } from '../infrastructure/db/cruds/drizzle-credential-repository';

export const getCredentialRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/credential',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'getCredential',
        tags: ['credential'],
        description: 'Get a list of credentials',
        response: {
          200: z.array(
            z.object({
              channelHead: z.string().nullable(),
              cnpj: z.string().nullable(),
              agentIndicator: z.string().nullable(),
              partner: z.string().nullable(),
            })
          ),
        },
      },
    },
    async (_, reply) => {
      const repo = new DrizzleCredentialRepository();
      const credentials = await repo.select();
      return reply.status(200).send(credentials);
    }
  );
};
