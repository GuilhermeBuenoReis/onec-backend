import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleContractRepository } from '../infrastructure/db/cruds/drizzle-contract-repository';

export const updateContractRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/contract/:id',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'updateContract',
        tags: ['contract'],
        description: 'Update a contract',
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          city: z.string().nullable().optional(),
          client: z.string().optional(),
          state: z.string().nullable().optional(),
          cnpj: z.string().nullable().optional(),
          sindic: z.string().nullable().optional(),
          year: z.string().nullable().optional(),
          matter: z.string().nullable().optional(),
          forecast: z.string().nullable().optional(),
          contractTotal: z.string().nullable().optional(),
          percentage: z.number().nullable().optional(),
          signedContract: z.string().nullable().optional(),
          status: z.string().nullable().optional(),
          averageGuide: z.number().nullable().optional(),
          partner: z.string().nullable().optional(),
          partnerCommission: z.number().nullable().optional(),
          counter: z.string().nullable().optional(),
          email: z.string().nullable().optional(),
        }),
        response: {
          200: z.object({
            contract: z.object({
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
              createdAt: z.date().nullable(),
              updatedAt: z.date().nullable(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const drizzleOrm = new DrizzleContractRepository();

      const updatedContract = await drizzleOrm.update(id, request.body);

      if (!updatedContract) {
        return reply.status(404).send({ message: 'Algo deu errado!' });
      }

      return reply.status(200).send({
        contract: updatedContract,
      });
    }
  );
};
