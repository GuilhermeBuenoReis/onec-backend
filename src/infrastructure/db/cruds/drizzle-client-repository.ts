import { eq } from 'drizzle-orm';
import { db } from '..';
import { Client } from '../../../domain/entities/Client';
import type { ClientRepository } from '../../../domain/repositories/Client';
import { clients } from '../schema';

export class DrizzleClientRepository implements ClientRepository {
  async create(data: Omit<Client, 'id'>): Promise<Client | null> {
    const newClient = new Client(
      undefined,
      data.enterprise,
      data.competenceMonth,
      data.cnpj,
      data.product,
      data.contestation,
      data.returned
    );

    const response = await db.insert(clients).values(newClient).returning();

    const client = response[0];

    return client;
  }
  async select(): Promise<Client[]> {
    const response = await db.select().from(clients);
    return response;
  }

  async update(id: string, data: Partial<Client>): Promise<Client | null> {
    const response = await db
      .update(clients)
      .set(data)
      .where(eq(clients.id, id))
      .returning();

    const updatedClient = response[0];

    return updatedClient;
  }
  async delete(id: string): Promise<boolean> {
    const response = await db
      .delete(clients)
      .where(eq(clients.id, id))
      .returning();

    return response.length > 0;
  }
}
