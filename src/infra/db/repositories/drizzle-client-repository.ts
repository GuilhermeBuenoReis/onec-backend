import { db } from '../index';
import { clients } from '../schema/client';
import type { ClientRepository } from '@/core/repositories/client-repository';
import type { Client } from '@/core/entities/client';
import { eq } from 'drizzle-orm';

export class DrizzleClientRepository implements ClientRepository {
  async create(data: Client): Promise<void> {
    await db.insert(clients).values(data);
  }

  async select(): Promise<Client[]> {
    return db.select().from(clients);
  }

  async update(id: string, data: Partial<Client>): Promise<void> {
    await db.update(clients).set(data).where(eq(clients.id, id));
  }

  async delete(id: string): Promise<void> {
    await db.delete(clients).where(eq(clients.id, id));
  }
}
