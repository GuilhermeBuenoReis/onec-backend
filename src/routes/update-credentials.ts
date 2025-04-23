import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleCredentialRepository } from '../infrastructure/db/cruds/drizzle-credential-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const updateCredentialRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/credential/:id',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'updateCredential',
        tags: ['credential'],
        description: 'Update a credential',
        params: z.object({
          id: z.string(),
        }),
        body: z
          .object({
            channelHead: z.string().nullable(),
            cnpj: z.string().nullable(),
            agentIndicator: z.string().nullable(),
            partner: z.string().nullable(),
          })
          .partial(),
        response: {
          200: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const repo = new DrizzleCredentialRepository();
      const updated = await repo.update(id, request.body);

      if (!updated) {
        return reply.status(404).send({ message: 'Credencial não encontrada' });
      }

      return reply
        .status(200)
        .send({ message: 'Credencial atualizada com sucesso!' });
    }
  );
};
