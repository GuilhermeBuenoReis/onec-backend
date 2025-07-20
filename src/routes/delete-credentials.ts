import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleCredentialRepository } from '../infrastructure/db/cruds/drizzle-credential-repository';

export const deleteCredentialRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/credential/:id',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'deleteCredential',
        tags: ['credential'],
        description: 'Delete a credential',
        params: z.object({
          id: z.string(),
        }),
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
      const drizzleOrm = new DrizzleCredentialRepository();
      const deleted = await drizzleOrm.delete(id);

      if (!deleted) {
        return reply.status(404).send({ message: 'Credencial não encontrada' });
      }

      return reply
        .status(200)
        .send({ message: 'Credencial deletada com sucesso!' });
    }
  );
};
