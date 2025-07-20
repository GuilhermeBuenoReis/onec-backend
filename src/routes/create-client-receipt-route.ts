import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleClientReceiptRepository } from '../infrastructure/db/cruds/drizzle-client-receipt-repository';

export const createClientReceiptRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/client-receipt',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'createClientReceipt',
        tags: ['clientReceipt'],
        description: 'Create a new Client Receipt',
        body: z.object({
          receiptDate: z.string().nullable(),
          competence: z.string().nullable(),
          cnpj: z.string().nullable(),
          clientName: z.string().nullable(),
          percentage: z.number().nullable(),
          compensationMonth: z.string().nullable(),
          honorary: z.number().nullable(),
          tax: z.number().nullable(),
          status: z.string().nullable(),
        }),
        response: {
          201: z.null(),

          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const drizzleOrm = new DrizzleClientReceiptRepository();
      const {
        receiptDate,
        competence,
        cnpj,
        clientName,
        percentage,
        compensationMonth,
        honorary,
        tax,
        status,
      } = request.body;

      await drizzleOrm.create({
        receiptDate,
        competence,
        cnpj,
        clientName,
        percentage,
        compensationMonth,
        honorary,
        tax,
        status,
      });

      return reply.status(201).send();
    }
  );
};
