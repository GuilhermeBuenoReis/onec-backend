import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { processNegotiationStaging } from '../infrastructure/db/staging/functions/process-negotiation-staging';

export const processNegotiationStagingRoute: FastifyPluginAsyncZod =
  async app => {
    app.post(
      '/process-staging/negotiations',
      {
        schema: {
          operationId: 'processNegotiationStaging',
          tags: ['Staging'],
          summary:
            'Processa negociações da tabela negotiation_staging para a negotiation_imports',
          response: {
            200: z.object({
              message: z.string(),
            }),
            500: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        try {
          await processNegotiationStaging();

          return reply.status(200).send({
            message: 'Negociações da staging processadas com sucesso.',
          });
        } catch (error) {
          console.error('[process-staging]', error);
          return reply.status(500).send({
            message: 'Erro ao processar negociações da staging.',
          });
        }
      }
    );
  };
