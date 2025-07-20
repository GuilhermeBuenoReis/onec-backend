import bcrypt from 'bcrypt';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserHook } from '../http/hooks/authenticate';
import { DrizzleUserRepository } from '../infrastructure/db/cruds/drizzle-user-repository';

export const updateUserRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/users/:id',
    {
      onRequest: [authenticateUserHook],
      schema: {
        operationId: 'updateUser',
        tags: ['Users'],
        description: 'Update an existing User',
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          email: z.string().email().optional(),
          password: z.string().min(6).optional(),
          role: z.string().optional(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { email, password, role } = request.body;
      const userRepository = new DrizzleUserRepository();

      const updateData: any = {};
      if (email) updateData.email = email;
      if (password) updateData.passwordHash = await bcrypt.hash(password, 10);
      if (role) updateData.role = role;

      const updatedUser = await userRepository.update(id, updateData);

      if (!updatedUser) {
        return reply.status(400).send({ message: 'Erro ao atualizar usuário' });
      }

      return reply
        .status(200)
        .send({ message: 'Usuário atualizado com sucesso' });
    }
  );
};
