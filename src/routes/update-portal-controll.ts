import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzlePortalControllRepository } from '../infrastructure/db/cruds/drizzle-portal-controll-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const updatePortalControllRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/portalcontrolls/:id',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'updatePortalControll',
        tags: ['portalcontrolls'],
        description: 'Update a portalcontroll',
        params: z.object({ id: z.string() }),
        body: z.object({
          enterprise: z.string().nullable().optional(),
          product: z.string().nullable().optional(),
          percentageHonorary: z.number().nullable().optional(),
          compensation: z.number().nullable().optional(),
          honorary: z.number().nullable().optional(),
          tax: z.number().nullable().optional(),
          value: z.number().nullable().optional(),
          situation: z.string().nullable().optional(),
          partnerId: z.string().optional(),
        }),
        response: {
          200: z.object({ id: z.string() }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const portalcontrollRepository = new DrizzlePortalControllRepository();
      const updated = await portalcontrollRepository.update(id, request.body);

      if (!updated) {
        return reply.status(404).send({ message: 'Controle não encontrado' });
      }

      return reply.status(200).send({ id: updated.id });
    }
  );
};
