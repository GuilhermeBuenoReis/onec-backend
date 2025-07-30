import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { negotiationContractSummaryCte } from '../infrastructure/db/cte/negotiation_contract_summary_cte_';

export const getContractNegotiationSummaryRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/contract-negotiation-summary',
      {
        onRequest: [authenticateUserHook],
        schema: {
          operationId: 'getContractNegotiationSummary',
          tags: ['contract', 'negotiation'],
          description: 'Retrieve merged contract and negotiation data',
          response: {
            200: z.object({
              result: z.array(
                z.object({
                  negotiationId: z.string(),
                  title: z.string().nullable(),
                  negotiationClient: z.string().nullable(),
                  user: z.string().nullable(),
                  tags: z.string().nullable(),
                  step: z.string().nullable(),
                  negotiationStatus: z.string().nullable(),
                  value: z.number().nullable(),
                  startsDate: z.string().nullable(),
                  observation: z.string().nullable(),
                  partnerId: z.string().nullable(),
                  negotiationAverageGuide: z.number().nullable(),
                  negotiationCreatedAt: z.date(),
                  negotiationUpdatedAt: z.date(),

                  contractId: z.string(),
                  contractClient: z.string().nullable(),
                  city: z.string().nullable(),
                  state: z.string().nullable(),
                  cnpj: z.string().nullable(),
                  sindic: z.string().nullable(),
                  year: z.string().nullable(),
                  matter: z.string().nullable(),
                  forecast: z.string().nullable(),
                  contractTotal: z.number().nullable(),
                  percentage: z.number().nullable(),
                  signedContract: z.string().nullable(),
                  contractStatus: z.string().nullable(),
                  contractAverageGuide: z.number().nullable(),
                  partner: z.string().nullable(),
                  partnerCommission: z.number().nullable(),
                  counter: z.string().nullable(),
                  email: z.string().nullable(),
                  contractCreatedAt: z.date(),
                  contractUpdatedAt: z.date(),
                })
              ),
            }),
            500: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (_request, reply) => {
        try {
          const { result } = await negotiationContractSummaryCte();
          return reply.status(200).send({ result });
        } catch (error) {
          return reply.status(500).send({
            message: 'Erro ao buscar resumo de contratos e negociações.',
          });
        }
      }
    );
  };
