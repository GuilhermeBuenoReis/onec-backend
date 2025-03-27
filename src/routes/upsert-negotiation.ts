import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DrizzleExelDataNegotiationRepository } from '../infrastructure/db/cruds/drizzle-data-negotiation-repository';
// import { authenticateUserHook } from '../http/hooks/authenticate';

export const upsertDataNegotiationRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/negotiation/upsert',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'upsertDataNegotiation',
        tags: ['DataNegotiations'],
        description:
          'Upsert de uma negociação. Se já existir um registro com o mesmo title, os campos serão atualizados; caso contrário, um novo registro será criado. Se o title estiver nulo, um valor único temporário é gerado para inserir o registro.',
        body: z.object({
          title: z.string().nullable(),
          client: z.string().nullable(),
          user: z.string().nullable(),
          tags: z.string().nullable(),
          step: z.string().nullable(),
          status: z.string().nullable(),
          value: z.number().nullable(),
          partnerId: z.string().nullable(),
          startsDate: z.string().nullable(),
          observation: z.string().nullable(),
          averageGuide: z.number().nullable(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            title: z.string().nullable(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const {
        title,
        client,
        user,
        tags,
        step,
        status,
        value,
        partnerId,
        startsDate,
        observation,
        averageGuide,
      } = request.body;

      const repository = new DrizzleExelDataNegotiationRepository();

      const result = await repository.upsert({
        title,
        client,
        user,
        tags,
        step,
        status,
        value,
        partnerId,
        startsDate,
        observation,
        averageGuide,
      });

      return reply.status(201).send(result);
    }
  );
};
