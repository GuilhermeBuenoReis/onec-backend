import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzlePortalControllRepository } from '../../src/infrastructure/db/cruds/drizzle-portal-controll-repository';

export const getAllPortalControllsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/portal/portalcontrolls',
    {
      schema: {
        operationId: 'getPortalControllsBySelectParternRoute',
        tags: ['portalcontrolls'],
        description:
          'Retorna todos os registros de PortalControlls para o parceiro informado via querystring',
        response: {
          200: z.array(
            z.object({
              id: z.string().nullable(),
              monthOfCalculation: z.string().nullable(),
              competenceMonth: z.string().nullable(),
              contract: z.number().nullable(),
              enterprise: z.string().nullable(),
              product: z.string().nullable(),
              percentageHonorary: z.number().nullable(),
              compensation: z.number().nullable(),
              honorary: z.number().nullable(),
              tax: z.number().nullable(),
              tj: z.number().nullable(),
              value: z.number().nullable(),
              situation: z.string().nullable(),
              partnerId: z.string(),
            })
          ),
          500: z.object({ error: z.string() }),
        },
      },
    },
    async (request, reply) => {
      try {
        const repo = new DrizzlePortalControllRepository();
        const items = await repo.select();

        return reply.status(200).send(items);
      } catch (err) {
        request.log.error(
          err,
          '❌ Erro em selecionar todos os PortalControlls'
        );
        return reply.status(500).send({ error: 'Erro interno no servidor' });
      }
    }
  );
};
