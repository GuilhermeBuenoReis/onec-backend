import type { FastifyRequest, FastifyReply } from 'fastify'
import { env } from '@/shared/env.js'
import jwt from 'jsonwebtoken'

export async function authenticateUserHook(request: FastifyRequest, reply: FastifyReply) {
  const token = request.cookies['app-token']

  if (!token) {
    return reply.status(401).send({ message: 'Token não encontrado' })
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET)

    request.user = decoded as {
      id: string
      role: string
      iat: number
      exp: number
    }
  } catch {
    return reply.status(401).send({ message: 'Token inválido ou expirado' })
  }
}
