import { sql } from 'drizzle-orm';
import { db } from '..';
import { Client } from '../../../domain/entities/Client';
import { Credential } from '../../../domain/entities/Credential';
import { clientTable, credentialsTable } from '../schema';
import { createId } from '@paralleldrive/cuid2';

export class DrizzleCredentialClientRepository {
  async createCredential({
    channelHead,
    cnpj,
    agentIndicator,
    partner,
  }: Omit<Credential, 'id'>) {
    const newCredential = new Credential(
      undefined,
      channelHead,
      partner,
      cnpj,
      agentIndicator
    );

    const response = await db
      .insert(credentialsTable)
      .values(newCredential)
      .returning();

    return response;
  }

  async createClient({
    enterprise,
    competenceMonth,
    cnpj,
    contestation,
    returned,
  }: Omit<Client, 'id'>) {
    const newClient = new Client(
      undefined,
      enterprise,
      competenceMonth,
      cnpj,
      contestation,
      returned
    );

    const response = await db.insert(clientTable).values(newClient).returning();

    return response;
  }

  async selectCredentialsAndClients() {
    const newId = createId().toString();

    const credentialsCTE = db
      .$with('credentials')
      .as(db.select().from(credentialsTable));

    const clientsCTE = db.$with('clients').as(db.select().from(clientTable));

    const result = db.with(credentialsCTE, clientsCTE).select({
      contestation: sql /*sql*/`
        JSON_BUILD_OBJECT(
          'id', ${newId}::text,
          'credential', (
            SELECT row_to_json(x)
            FROM (
              SELECT 
                id::text AS id, 
                channel_head::text AS "channelHead", 
                partner::text AS partner, 
                cnpj::text AS cnpj, 
                agent_indicator::text AS "agentIndicator"
              FROM credentials
              LIMIT 1
            ) x
          ),
          'client', (
            SELECT row_to_json(x)
            FROM (
              SELECT 
                id::text AS id, 
                enterprise::text AS enterprise, 
                competence_month::text AS "competenceMonth", 
                cnpj::text AS cnpj, 
                contestation::text AS contestation, 
                "return"::text AS returned
              FROM clients
              LIMIT 1
            ) x
          )
        )
      `.as('contestation'),
    });

    const executedResult = await result.from(credentialsCTE).execute();
    return executedResult[0];
  }
}
