import { eq } from 'drizzle-orm';
import { db } from '..';
import { Credential } from '../../../domain/entities/Credential';
import type { CredentialRepository } from '../../../domain/repositories/Credentials';
import { credentials } from '../schema';

export class DrizzleCredentialRepository implements CredentialRepository {
  async createCredential(
    data: Omit<Credential, 'id'>
  ): Promise<Credential | null> {
    const newCredential = new Credential(
      undefined,
      data.channelHead ?? null,
      data.partner ?? null,
      data.cnpj,
      data.agentIndicator
    );

    const response = await db
      .insert(credentials)
      .values(newCredential)
      .returning();

    if (response.length === 0) {
      return null;
    }

    const created = response[0];
    return new Credential(
      created.id,
      created.channelHead,
      created.partner,
      created.cnpj,
      created.agentIndicator
    );
  }

  select(): Promise<Credential[]> {
    const response = db.select().from(credentials);
    return response;
  }

  async update(
    id: string,
    data: Partial<Credential>
  ): Promise<Credential | null> {
    const response = await db
      .update(credentials)
      .set(data)
      .where(eq(credentials.id, id))
      .returning();

    return response[0] || null;
  }
  async delete(id: string): Promise<boolean> {
    const response = await db
      .delete(credentials)
      .where(eq(credentials.id, id))
      .returning();

    return response.length > 0;
  }
}
