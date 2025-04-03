import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleCredentialClientRepository } from '../infrastructure/db/cruds/drizzle-credential-client-repository';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleClientRepository } from '../infrastructure/db/cruds/drizzle-client-repository';

export const createClientRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/client',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'createClient',
        tags: ['client'],
        description: 'Create a new Client',
        body: z.object({
          enterprise: z.string().nullable(),
          competenceMonth: z.string().nullable(),
          cnpj: z.string().nullable(),
          contestation: z.string().nullable(),
          returned: z.string().nullable(),
          product: z.string().nullable(),
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
      const drizzleOrm = new DrizzleClientRepository();
      const {
        enterprise,
        competenceMonth,
        cnpj,
        contestation,
        returned,
        product,
      } = request.body;
      request.body;

      await drizzleOrm.create({
        enterprise,
        competenceMonth,
        cnpj,
        contestation,
        returned,
        product,
      });

      return reply.status(201).send();
    }
  );
};
