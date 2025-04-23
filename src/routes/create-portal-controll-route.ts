import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzlePortalControllRepository } from '../infrastructure/db/cruds/drizzle-portal-controll-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const createPortalControllRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/portalcontrolls',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'createPortalControll',
        tags: ['portalcontrolls'],
        description: 'Create a new portalcontroll',
        body: z.object({
          monthOfCalculation: z.string().nullable(),
          competenceMonth: z.string().nullable(),
          contract: z.number().nullable(),
          enterprise: z.string().nullable(),
          product: z.string().nullable(),
          percentageHonorary: z.number().nullable(),
          compensation: z.number().nullable(),
          honorary: z.number().nullable(),
          tax: z.number().nullable(),
          value: z.number().nullable(),
          situation: z.string().nullable(),
          partnerId: z.string(), // ← novo campo obrigatório
        }),
        response: {
          201: z.object({ id: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const portalcontrollRepository = new DrizzlePortalControllRepository();
      const portalcontroll = await portalcontrollRepository.create(
        request.body
      );

      if (!portalcontroll?.id) {
        throw new Error('Erro ao cadastrar os dados do portal de controle');
      }

      return reply.status(201).send({ id: portalcontroll.id });
    }
  );
};
