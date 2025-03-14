import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzlePortalControllRepository } from '../infrastructure/db/cruds/drizzle-portal-controll-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const getPortalControllsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/portalcontrolls',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'getPortalControlls',
        tags: ['portalcontrolls'],
        description: 'Get a list of portalcontrolls',
        response: {
          200: z.array(
            z.object({
              id: z.string().nullable(),
              enterprise: z.string().nullable(),
              product: z.string().nullable(),
              percentageHonorary: z.number().nullable(),
              compensation: z.number().nullable(),
              honorary: z.number().nullable(),
              tax: z.number().nullable(),
              value: z.number().nullable(),
              situation: z.string().nullable(),
            })
          ),
        },
      },
    },
    async (_, reply) => {
      const portalcontrollRepository = new DrizzlePortalControllRepository();
      const portalcontrolls = await portalcontrollRepository.select();

      return reply.status(200).send(portalcontrolls);
    }
  );
};
