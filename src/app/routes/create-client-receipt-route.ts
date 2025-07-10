import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { createClientReceiptController } from '../controllers/create-client-receipt-controller.js';
import { authenticateUserHook } from '@/infra/http/middlewares/authenticate-verify-jwt.js';

export const createClientReceiptRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/api/client-receipt',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'createClientReceipt',
        tags: ['clientReceipt'],
        description: 'Cria um novo client receipt',
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
      const result = await createClientReceiptController(request.body);

      if (result?.error) {
        return reply.status(400).send({ message: result.error });
      }

      return reply.status(201).send();
    }
  );
};
