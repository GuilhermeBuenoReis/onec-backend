import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzlePortalControllRepository } from '../infrastructure/db/cruds/drizzle-portal-controll-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

export const importPortalControllsRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/portalcontrolls/import',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'importPortalControlls',
        tags: ['portalcontrolls'],
        description:
          'Importa registros de PortalControll via upload CSV/JSON e faz upsert no banco',
        body: z.array(
          z.object({
            id: z.string().optional(),
            monthOfCalculation: z.string().nullable().optional(),
            competenceMonth: z.string().nullable().optional(),
            contract: z.number().nullable().optional(),
            enterprise: z.string().nullable().optional(),
            product: z.string().nullable().optional(),
            percentageHonorary: z.number().nullable().optional(),
            compensation: z.number().nullable().optional(),
            honorary: z.number().nullable().optional(),
            tax: z.number().nullable().optional(),
            value: z.number().nullable().optional(),
            situation: z.string().nullable().optional(),
            partnerId: z.string(),
          })
        ),
        response: {
          200: z.object({ imported: z.number() }),
          400: z.object({ error: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const items = request.body;
      const repo = new DrizzlePortalControllRepository();
      let count = 0;

      try {
        for (const raw of items) {
          const data = {
            id: raw.id,
            monthOfCalculation: raw.monthOfCalculation ?? undefined,
            competenceMonth: raw.competenceMonth ?? undefined,
            contract: raw.contract ?? undefined,
            enterprise: raw.enterprise ?? undefined,
            product: raw.product ?? undefined,
            percentageHonorary: raw.percentageHonorary ?? undefined,
            compensation: raw.compensation ?? undefined,
            honorary: raw.honorary ?? undefined,
            tax: raw.tax ?? undefined,
            value: raw.value ?? undefined,
            situation: raw.situation ?? undefined,
            partnerId: raw.partnerId,
          };

          await repo.upsert(data as any);
          count++;
        }

        return reply.status(200).send({ imported: count });
      } catch (err) {
        request.log.error(err, '❌ Erro ao importar PortalControlls');
        return reply
          .status(400)
          .send({ error: 'Falha na importação dos dados' });
      }
    }
  );
};
