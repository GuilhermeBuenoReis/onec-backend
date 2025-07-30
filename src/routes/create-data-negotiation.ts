import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { authenticateUserHook } from '../http/hooks/authenticate';
import { db } from '../infrastructure/db';
import { DrizzleExelDataNegotiationRepository } from '../infrastructure/db/cruds/drizzle-negotiation-repository';
import { contracts } from '../infrastructure/db/schema';

export const createDataNegotiationRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/negotiation',
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: 'createDataNegotiation',
        tags: ['DataNegotiations'],
        description: 'Create a new DataNegotiation',
        body: z.object({
          title: z.string().nullable(),
          client: z.string().nullable(),
          user: z.string().nullable(),
          tags: z.string().nullable(),
          step: z.string().nullable(),
          status: z.string().nullable(),
          value: z.coerce.number().nullable(),
          partnerId: z.string().nullable(),
          startsDate: z.string().nullable(),
          observation: z.string().nullable(),
          averageGuide: z.coerce.number().nullable(),
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
      const drizzleOrm = new DrizzleExelDataNegotiationRepository();

      const {
        title,
        client,
        user,
        tags,
        step,
        status,
        value,
        startsDate,
        observation,
        averageGuide,
        partnerId,
      } = request.body;

      let referenceId = createId();

      if (client) {
        const match = await db
          .select({ referenceId: contracts.referenceId })
          .from(contracts)
          .where(eq(contracts.client, client))
          .limit(1);

        if (match.length > 0 && match[0].referenceId) {
          referenceId = match[0].referenceId;
        }
      }

      const created = await drizzleOrm.create({
        title: title ?? '',
        client: client ?? '',
        user: user ?? '',
        tags: tags ?? '',
        step: step ?? '',
        status: status ?? '',
        value: value ?? 0,
        startsDate: startsDate ?? '',
        observation: observation ?? '',
        averageGuide: averageGuide ?? 0,
        partnerId: partnerId ?? '',
        referenceId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (!created) {
        return reply.status(400).send({ message: 'Erro ao criar negociação' });
      }

      return reply.status(201).send({ id: created.id });
    }
  );
};
