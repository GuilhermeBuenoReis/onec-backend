import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzlePortalControllRepository } from '../infrastructure/db/cruds/drizzle-portal-controll-repository';

export const deletePortalControllRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/portalcontrolls/:id',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'deletePortalControll',
        tags: ['portalcontrolls'],
        description: 'Delete a portalcontroll',
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
      const portalcontrollRepository = new DrizzlePortalControllRepository();
      const deleted = await portalcontrollRepository.delete(id);

      if (!deleted) {
        return reply.status(404).send({ message: 'Controle não encontrado' });
      }

      return reply
        .status(200)
        .send({ message: 'Controle deletado com sucesso' });
    }
  );
};
