import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzlePartnerRepository } from '../infrastructure/db/cruds/drizzle-partner-repository';

export const getPartnersRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/partners',
    {
      schema: {
        onRequest: [authenticateUserHook],
        operationId: 'getPartners',
        tags: ['partners'],
        description: 'Get a list of partners',
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              name: z.string().nullable(),
              cpfOrCnpj: z.string().nullable(),
              city: z.string().nullable(),
              state: z.string().nullable(),
              commission: z.number().nullable(),
              portal: z.string().nullable(),
              channelHead: z.string().nullable(),
              regional: z.string().nullable(),
              coordinator: z.string().nullable(),
              agent: z.string().nullable(),
              indicator: z.string().nullable(),
              contract: z.string().nullable(),
              phone: z.string().nullable(),
              email: z.string().nullable(),
              responsible: z.string().nullable(),
            })
          ),
        },
      },
    },
    async (_, reply) => {
      const partnerRepository = new DrizzlePartnerRepository();
      const partners = await partnerRepository.select();

      return reply.status(200).send(partners);
    }
  );
};
