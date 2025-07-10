import fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import fastifyCookie from '@fastify/cookie'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import path from 'path'
import { writeFile } from 'fs/promises'
import { createId } from '@paralleldrive/cuid2'

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { env } from './shared/env.js'
import { seedAdmins } from './infra/db/seeds/index.js'

import { authenticateUserRoute } from './app/routes/authenticate-user-router.js'
import { createClientReceiptRoute } from './app/routes/create-client-receipt-route.js'
import { createClientRoute } from './app/routes/create-client-route.js'

const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()

// 📌 Registro das rotas
app.register(authenticateUserRoute)
app.register(createClientReceiptRoute)
app.register(createClientRoute)

// 🔧 Configurações do Fastify
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors, {
  origin: '*',
})

app.register(fastifyCookie, {
  secret: env.JWT_SECRET,
})

app.register(multipart)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'ONEC API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// 🔍 Health check
app.get('/health', async () => {
  return { status: 'ok', version: 'v2' }
})

// 🌱 Seed inicial de admin
;(async () => {
  await seedAdmins()
})()

// 🚀 Start do servidor
app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`🚀 HTTP server running at http://localhost:3333`)
  })

// 📄 Geração do Swagger JSON (somente em desenvolvimento)
if (env.NODE_ENV === 'development') {
  const specFile = path.resolve('swagger.json')

  app.ready().then(() => {
    const spec = JSON.stringify(app.swagger(), null, 2)

    writeFile(specFile, spec).then(() => {
      console.log('📄 Swagger spec generated!')
      console.log('🧠 Build ID:', createId())
    })
  })
}
