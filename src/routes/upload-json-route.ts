import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { PortalControll } from '../../src/domain/entities/portal-controll';
import { DrizzlePortalControllRepository } from '../../src/infrastructure/db/cruds/drizzle-portal-controll-repository';

export const uploadJsonRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/portalcontrolls/:partnerId/upload-json',
    {
      schema: {
        operationId: 'uploadJsonPortalControlls',
        tags: ['portalcontrolls'],
        description:
          'Recebe JSON com múltiplas abas. Realiza full load na primeira vez e incremental (última aba) depois.',
        params: z.object({ partnerId: z.string() }),
        body: z.object({
          sheets: z.array(
            z.object({
              name: z.string(),
              data: z.array(
                z.object({
                  'Mês Apuração': z.any(),
                  'Mês Competência': z.any(),
                  Contrato: z.any(),
                  Empresa: z.any(),
                  Produto: z.any(),
                  '% Honorario': z.any(),
                  Compensação: z.any(),
                  Honorários: z.any(),
                  Imposto: z.any(),
                  'Valor R$': z.any(),
                })
              ),
            })
          ),
        }),
      },
    },
    async (request, reply) => {
      const { sheets } = request.body;
      const { partnerId } = request.params;
      const repo = new DrizzlePortalControllRepository();
      const total = await repo.count();
      const firstLoad = total === 0;

      const toProcess = firstLoad ? sheets : [sheets[sheets.length - 1]];

      if (firstLoad) {
        await repo.deleteByCompetenceMonth('%');
      } else {
        const lastName = toProcess[0].name;
        await repo.deleteByCompetenceMonth(lastName);
      }

      for (const sheet of toProcess) {
        const toInsert = sheet.data.map(row => {
          return new PortalControll(
            undefined,
            row['Mês Apuração']?.toString().trim() || null,
            row['Mês Competência']?.toString().trim() || null,
            Number(row['Contrato'] ?? null),
            row['Empresa']?.toString().trim() || null,
            row['Produto']?.toString().trim() || null,
            Number(row['% Honorario'] ?? null),
            Number(row['Compensação'] ?? null),
            Number(row['Honorários'] ?? null),
            Number(row['Imposto'] ?? null),
            Number(row['Valor R$'] ?? null),
            null,
            partnerId
          );
        });
        await repo.bulkCreate(toInsert);
      }

      return reply.status(200).send({ success: true });
    }
  );
};
