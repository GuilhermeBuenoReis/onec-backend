import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { createClientController } from '../controllers/create-client-controller';

export const createClientRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/api/client',
    {
      schema: {
        operationId: 'createClient',
        tags: ['client'],
        description: 'Cria um novo cliente',
        body: z.object({
          enterprise: z.string().nullable(),
          cnpj: z.string().nullable(),
          competenceMonth: z.string().nullable(),
          product: z.string().nullable(),
          contestation: z.string().nullable(),
          returned: z.string().nullable(),
        }),
        response: {
          201: z.null(),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      try {
        await createClientController(request.body);
        return reply.status(201).send();
      } catch (error) {
        return reply.status(400).send({ message: 'Erro ao criar cliente' });
      }
    }
  );
};
