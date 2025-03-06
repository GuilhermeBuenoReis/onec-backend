import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleContractRepository } from '../infrastructure/db/cruds/drizzle-contract-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';

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
            message: z.string(),
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
      const updatedcontract = await drizzleOrm.update(id, request.body);

      if (!updatedcontract) {
        return reply.status(404).send({ message: 'Algo deu errado!' });
      }

      return reply.status(200).send({
        message: 'Item atualizado com sucesso!',
      });
    }
  );
};
