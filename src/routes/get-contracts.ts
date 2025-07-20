import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleContractRepository } from '../infrastructure/db/cruds/drizzle-contract-repository';

export const getContractRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/contract',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'getContract',
        tags: ['contract'],
        description: 'Get a list of contract',
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              city: z.string().nullable(),
              client: z.string().nullable(),
              state: z.string().nullable(),
              cnpj: z.string().nullable(),
              sindic: z.string().nullable(),
              year: z.string().nullable(),
              matter: z.string().nullable(),
              forecast: z.string().nullable(),
              contractTotal: z.string().nullable(),
              percentage: z.number().nullable(),
              signedContract: z.string().nullable(),
              status: z.string().nullable(),
              averageGuide: z.number().nullable(),
              partner: z.string().nullable(),
              partnerCommission: z.number().nullable(),
              counter: z.string().nullable(),
              email: z.string().nullable(),
            })
          ),
        },
      },
    },
    async (_, reply) => {
      const drizzleOrm = new DrizzleContractRepository();
      const contracts = await drizzleOrm.select();

      return reply.status(200).send(contracts);
    }
  );
};
