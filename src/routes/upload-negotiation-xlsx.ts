import { createId } from '@paralleldrive/cuid2';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { db } from '../infrastructure/db/index';
import { negotiationStaging } from '../infrastructure/db/schema';
import { parseExcelToJsonNegotiation } from '../utils/parse-excel-to-json-negotiation';

export const uploadNegotiationXlsxRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/upload-xlsx/negotiations',
    {
      schema: {
        consumes: ['multipart/form-data'],
        body: z.object({
          file: z.any(),
        }),
        response: {
          200: z.object({ message: z.string(), count: z.number() }),
          400: z.object({ message: z.string() }),
        },
        tags: ['Staging'],
        summary:
          'Faz upload de uma planilha Excel e insere os dados na negotiation_staging',
      },
    },
    async (request, reply) => {
      const data = await request.file();

      if (!data) {
        return reply.status(400).send({ message: 'Arquivo não enviado.' });
      }

      let rows: any[];
      try {
        const buffer = await data.toBuffer();
        rows = parseExcelToJsonNegotiation(buffer);

        for (const row of rows) {
          await db.insert(negotiationStaging).values({
            id: createId(),
            ...row,
            importStatus: 'pendente',
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      } catch (error: any) {
        // Retorna erro amigável se o parser não encontrar aba/campos válidos
        return reply.status(400).send({
          message:
            error?.message ||
            'Erro ao processar planilha. Verifique os campos e tente novamente.',
        });
      }

      return reply.send({
        message: 'Arquivo importado com sucesso.',
        count: rows.length,
      });
    }
  );
};
