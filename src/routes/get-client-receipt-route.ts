import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleClientRepository } from '../infrastructure/db/cruds/drizzle-client-repository';
import { DrizzleClientReceiptRepository } from '../infrastructure/db/cruds/drizzle-client-receipt-repository';

export const getClientReceiptRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/client-receipt',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'getClient-receipt',
        tags: ['clientReceipt'],
        description: 'Get a list of client Receipt',
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              receiptDate: z.string().nullable(),
              competence: z.string().nullable(),
              cnpj: z.string().nullable(),
              clientName: z.string().nullable(),
              percentage: z.number().nullable(),
              compensationMonth: z.string().nullable(),
              honorary: z.number().nullable(),
              tax: z.number().nullable(),
              status: z.string().nullable(),
            })
          ),
        },
      },
    },
    async (_, reply) => {
      const DrizzleOrm = new DrizzleClientReceiptRepository();
      const clientReceipt = await DrizzleOrm.select();
      return reply.status(200).send(clientReceipt);
    }
  );
};
