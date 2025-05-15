import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleContractRepository } from '../infrastructure/db/cruds/drizzle-contract-repository';

export const getContractByIdRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/contract/:id',
    {
      schema: {
        operationId: 'getContractById',
        tags: ['contract'],
        description: 'Get contract by id',
        params: z.object({ id: z.string() }),
        response: {
          200: z.object({
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
          }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const repo = new DrizzleContractRepository();
      const contract = await repo.selectById(id);
      if (!contract) {
        return reply.status(404).send({ message: 'Contrato não encontrado' });
      }
      return reply.status(200).send(contract);
    }
  );
};
