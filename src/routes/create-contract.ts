import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleContractRepository } from '../infrastructure/db/cruds/drizzle-contract-repository';

export const createContractRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/contract',
    {
      schema: {
        operationId: 'createDatacontract',
        tags: ['contract'],
        description: 'Create a new Datacontract',
        body: z.object({
          city: z.string().nullable(),
          client: z.string(),
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
        response: {
          201: z.object({
            id: z.string(),
            name: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const drizzleOrm = new DrizzleContractRepository();

      const {
        city,
        client,
        state,
        cnpj,
        sindic,
        year,
        matter,
        forecast,
        contractTotal,
        percentage,
        signedContract,
        status,
        averageGuide,
        partner,
        partnerCommission,
        counter,
        email,
      } = request.body;

      await drizzleOrm.create({
        city,
        client,
        state,
        cnpj,
        sindic,
        year,
        matter,
        forecast,
        contractTotal,
        percentage,
        signedContract,
        status,
        averageGuide,
        partner,
        partnerCommission,
        counter,
        email,
      });

      return reply.status(201).send();
    }
  );
};
