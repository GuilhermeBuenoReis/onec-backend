import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleClientReceiptRepository } from '../infrastructure/db/cruds/drizzle-client-receipt-repository';

export const updateClientReceiptRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/client-receipt/:id',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'updateClientReceipt',
        tags: ['clientReceipt'],
        description: 'Update a client Receipt',
        params: z.object({
          id: z.string(),
        }),
        body: z
          .object({
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
          .partial(),
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
      const repo = new DrizzleClientReceiptRepository();
      const updated = await repo.update(id, request.body);

      if (!updated) {
        return reply.status(404).send({ message: 'Cliente não encontrado' });
      }

      return reply
        .status(200)
        .send({ message: 'Cliente atualizada com sucesso!' });
    }
  );
};
