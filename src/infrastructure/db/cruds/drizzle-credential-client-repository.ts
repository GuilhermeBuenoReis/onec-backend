import { sql } from 'drizzle-orm';
import { db } from '..';
import { clientTable, credentialsTable } from '../schema';
import { createId } from '@paralleldrive/cuid2';

export class DrizzleCredentialClientRepository {
  async selectCredentialsAndClients() {
    const newId = createId().toString();

    const result = await db.execute(sql`
      WITH credentials_with_rn AS (
        SELECT 
          ROW_NUMBER() OVER (ORDER BY id) AS rn,
          id::text,
          channel_head::text AS "channelHead",
          partner::text,
          cnpj::text,
          agent_indicator::text AS "agentIndicator"
        FROM ${credentialsTable}
      ),
      clients_with_rn AS (
        SELECT 
          ROW_NUMBER() OVER (ORDER BY id) AS rn,
          id::text,
          enterprise::text,
          competence_month::text AS "competenceMonth",
          cnpj::text,
          contestation::text,
          "return"::text AS returned
        FROM ${clientTable}
      )
      SELECT JSON_BUILD_OBJECT(
               'id', ${newId}::text,
               'credential', row_to_json(c),
               'client', row_to_json(cl)
             ) AS contestation
      FROM credentials_with_rn c
      JOIN clients_with_rn cl ON c.rn = cl.rn;
    `);

    return result;
  }
}
