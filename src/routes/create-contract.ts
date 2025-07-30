import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { authenticateUserHook } from '../http/hooks/authenticate';
import { db } from '../infrastructure/db';
import { DrizzleContractRepository } from '../infrastructure/db/cruds/drizzle-contract-repository';
import { negotiations } from '../infrastructure/db/schema';

export const createContractRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/contract',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'createContract',
        tags: ['contract'],
        description: 'Create a new Datacontract',
        body: z.object({
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
        response: {
          201: z.object({
            id: z.string(),
            name: z.string().optional(),
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

      let referenceId = createId(); // default fallback

      if (client) {
        const negotiationMatch = await db
          .select({ referenceId: negotiations.referenceId })
          .from(negotiations)
          .where(eq(negotiations.client, client))
          .limit(1);

        if (negotiationMatch.length > 0 && negotiationMatch[0].referenceId) {
          referenceId = negotiationMatch[0].referenceId;
        }
      }

      const created = await drizzleOrm.create({
        city: city ?? '',
        client: client ?? '',
        state: state ?? '',
        cnpj: cnpj ?? '',
        sindic: sindic ?? '',
        year: year ?? '',
        matter: matter ?? '',
        forecast: forecast ?? '',
        contractTotal: contractTotal ?? '',
        percentage: percentage ?? 0,
        signedContract: signedContract ?? '',
        status: status ?? '',
        averageGuide: averageGuide ?? 0,
        partner: partner ?? '',
        partnerCommission: partnerCommission ?? 0,
        counter: counter ?? '',
        email: email ?? '',
        referenceId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (!created) {
        return reply.status(400).send({ message: 'Erro ao criar contrato' });
      }

      return reply.status(201).send({ id: created.id });
    }
  );
};
