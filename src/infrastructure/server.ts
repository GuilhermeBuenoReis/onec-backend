import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fastifyCors } from '@fastify/cors';
import { fastifyJwt } from '@fastify/jwt';
import fastifyMultipart from '@fastify/multipart';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import dotenv from 'dotenv';
import { fastify } from 'fastify';
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { env } from '../env';

import { fastifyCookie } from '@fastify/cookie';
import { createId } from '@paralleldrive/cuid2';
import { uploadXlsxRoute } from '../routes/ai-upload';
import { authenticateUserRoute } from '../routes/authenticate-user';
import { createClientReceiptRoute } from '../routes/create-client-receipt-route';
import { createClientRoute } from '../routes/create-client-route';
import { createContractRoute } from '../routes/create-contract';
import { createCredentialRoute } from '../routes/create-credentials-route';
import { createDataNegotiationRoute } from '../routes/create-data-negotiation';
import { createPendingRoute } from '../routes/create-new-pending-route';
import { createPartnerRoute } from '../routes/create-partner-route';
import { createPortalControllRoute } from '../routes/create-portal-controll-route';
import { deleteClientRoute } from '../routes/delete-client';
import { deleteClientReceiptRoute } from '../routes/delete-client-receipt-route';
import { deleteContractRoute } from '../routes/delete-contracts';
import { deleteCredentialRoute } from '../routes/delete-credentials';
import { deleteNegotiationRoute } from '../routes/delete-negotiation';
import { deletePartnerRoute } from '../routes/delete-partner-route';
import { deletePendingRoute } from '../routes/delete-pending';
import { deletePortalControllRoute } from '../routes/delete-portal-controll-route';
import { deleteUserRoute } from '../routes/delete-user';
import { getClientRoute } from '../routes/get-client';
import { getClientReceiptRoute } from '../routes/get-client-receipt-route';
import { getContractByIdRoute } from '../routes/get-contract-by-id';
import { getContractRoute } from '../routes/get-contracts';
import { getContractStatusCountRoute } from '../routes/get-count-status';
import { getCredentialClientRoute } from '../routes/get-credentials-and-clients';
import { getNegotiationRoute } from '../routes/get-negotiation';
import { getNegotiationByIdRoute } from '../routes/get-negotiation-by-id';
import { getContractNegotiationSummaryRoute } from '../routes/get-negotiation-contract-summary-route';
import { getOnePartnerRoute } from '../routes/get-one-partner';
import { getOnePendingRoute } from '../routes/get-one-pending';
import { getPartnersRoute } from '../routes/get-patners-route';
import { getPendingsRoute } from '../routes/get-pendings';
import { getPortalControllsBySelectByIdRoute } from '../routes/get-portal-controll-by-id';
import { getPortalControllsBySelectParternRoute } from '../routes/get-portal-controlls-by-partner';
import { getProfileUser } from '../routes/get-profile-user';
import { getContractStatusCountByFilterRoute } from '../routes/get-status-filter';
import { processNegotiationStagingRoute } from '../routes/process-negotiation-staging-route';
import { updateClientRoute } from '../routes/update-client';
import { updateClientReceiptRoute } from '../routes/update-client-receipt-route';
import { updateContractRoute } from '../routes/update-contract';
import { updateCredentialRoute } from '../routes/update-credentials';
import { updateNegotiationRoute } from '../routes/update-negotiation';
import { updatePartnerRoute } from '../routes/update-partner-route';
import { updatePendingRoute } from '../routes/update-pending';
import { updatePortalControllRoute } from '../routes/update-portal-controll';
import { updateUserRoute } from '../routes/update-user';

dotenv.config({ path: '/home/onec/onec-project/onec-backend/.env' });
console.log('> database url:', process.env.DATABASE_URL);

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, { origin: '*' });
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyMultipart);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(fastifyCookie, {
  secret: env.JWT_SECRET,
  hook: 'onRequest',
  parseOptions: {},
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'onec',
      version: '2.0.0',
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
app.register(createContractRoute);
app.register(getContractRoute);
app.register(updateContractRoute);
app.register(deleteContractRoute);
app.register(authenticateUserRoute);
app.register(getProfileUser);
app.register(updateUserRoute);
app.register(deleteUserRoute);
app.register(createPendingRoute);
app.register(getPendingsRoute);
app.register(deletePendingRoute);
app.register(updatePendingRoute);
app.register(createPortalControllRoute);
app.register(deletePortalControllRoute);
app.register(updatePortalControllRoute);
app.register(getContractStatusCountRoute);
app.register(getContractStatusCountByFilterRoute);
app.register(getOnePartnerRoute);
app.register(getOnePendingRoute);
app.register(createCredentialRoute);
app.register(createClientRoute);
app.register(getCredentialClientRoute);
app.register(updateCredentialRoute);
app.register(deleteCredentialRoute);
app.register(getClientRoute);
app.register(updateClientRoute);
app.register(deleteClientRoute);
app.register(getPortalControllsBySelectParternRoute);
app.register(getContractByIdRoute);
app.register(createClientReceiptRoute);
app.register(getClientReceiptRoute);
app.register(deleteClientReceiptRoute);
app.register(updateClientReceiptRoute);
app.register(getNegotiationByIdRoute);
app.register(getPortalControllsBySelectByIdRoute);
app.register(getContractNegotiationSummaryRoute);
app.register(uploadXlsxRoute);
app.register(processNegotiationStagingRoute);

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('Http server running 🚀🚀');
  });

if (env.NODE_ENV === 'development') {
  const specFile = resolve(__dirname, '../../swagger.json');

  app.ready().then(() => {
    const spec = JSON.stringify(app.swagger(), null, 2);

    writeFile(specFile, spec).then(() => {
      console.log('Swagger spec generated!');
      console.log(createId());
    });
  });
}
