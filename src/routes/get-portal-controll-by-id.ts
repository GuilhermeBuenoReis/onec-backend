import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { DrizzlePortalControllRepository } from '../../src/infrastructure/db/cruds/drizzle-portal-controll-repository';

function sanitizeNumber(value: unknown): number | null {
  return typeof value === 'number' && !Number.isNaN(value) ? value : null;
}

function sanitizeItem<T extends Record<string, any>>(
  item: T,
  keys: Array<keyof T>
): T {
  const result = { ...item };
  for (const key of keys) {
    result[key] = sanitizeNumber(result[key]) as T[keyof T];
  }
  return result;
}

const NUMERIC_FIELDS = [
  'contract',
  'percentageHonorary',
  'compensation',
  'honorary',
  'tax',
  'value',
] as const;

export const getPortalControllsBySelectByIdRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/portal/portalcontrolls/:id',
      {
        schema: {
          operationId: 'getPortalControllsBySelectById',
          tags: ['portalcontrolls'],
          description:
            'Retorna todos os registros de PortalControlls para o parceiro informado via querystring',
          params: z.object({
            id: z.string(),
          }),
          response: {
            200: z.array(
              z.object({
                id: z.string(),
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
          const { id } = request.params;
          const repo = new DrizzlePortalControllRepository();
          const rawResponse = await repo.getControllById(id);

          const sanitizedResponse = (rawResponse ?? []).map(item =>
            sanitizeItem(item, [...NUMERIC_FIELDS])
          );

          return reply.status(200).send(sanitizedResponse);
        } catch (err) {
          request.log.error(err, '❌ Erro em selectByPartner');
          return reply.status(500).send({ error: 'Erro interno no servidor' });
        }
      }
    );
  };
