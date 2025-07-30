import type { FastifyJWT } from '@fastify/jwt';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { DrizzleUserRepository } from '../infrastructure/db/cruds/drizzle-user-repository';

export const getMeRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/me',
    {
      schema: {
        operationId: 'getMe',
        tags: ['Users'],
        description: 'Retorna o perfil do usuário autenticado',
        response: {
          200: z.object({
            id: z.string(),
            email: z.string().email(),
            role: z.string(),
          }),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const payload = await request.jwtVerify<FastifyJWT['user']>();

      console.log('[DEBUG] PAYLOAD JWT:', payload);

      const userRepository = new DrizzleUserRepository();
      const user = await userRepository.findById(payload.id);

      if (!user?.id || !user?.email || !user?.role) {
        return reply.status(401).send({ message: 'Usuário inválido' });
      }

      return reply.send({
        id: user.id,
        email: user.email,
        role: user.role,
      });
    }
  );
};
