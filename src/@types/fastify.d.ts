import 'fastify';

declare module 'fastify' {
  interface FastifyJWT {
    user: {
      id: string;
    };
  }
}
