import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string
      role: string
      iat: number
      exp: number
    }
  }
}
