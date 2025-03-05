import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { fastifyJwt } from '@fastify/jwt';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { config } from 'dotenv';
import { env } from '../env';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import fastifyMultipart from '@fastify/multipart';
import { createPartnerRoute } from '../routes/create-partner-route';
import { getPartnersRoute } from '../routes/get-patners-route';
import { updatePartnerRoute } from '../routes/update-partner-route';
import { deletePartnerRoute } from '../routes/delete-partner-route';
import { createDataNegotiationRoute } from '../routes/create-data-negotiation';
import { getNegotiationRoute } from '../routes/get-negotiation';
import { updateNegotiationRoute } from '../routes/update-negotiation';
import { deleteNegotiationRoute } from '../routes/delete-negotiation';

config();

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: '*',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(fastifyMultipart);
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'onec',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

app.register(createPartnerRoute);
app.register(getPartnersRoute);
app.register(updatePartnerRoute);
app.register(deletePartnerRoute);
app.register(createDataNegotiationRoute);
app.register(getNegotiationRoute);
app.register(updateNegotiationRoute);
app.register(deleteNegotiationRoute);

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('Http server running 🚀🚀');
  });

if (env.NODE_ENV === 'development') {
  const specFile = resolve(__dirname, '../swagger.json');

  app.ready().then(() => {
    const spec = JSON.stringify(app.swagger(), null, 2);

    writeFile(specFile, spec).then(() => {
      console.log('Swagger spec generated!');
    });
  });
}
