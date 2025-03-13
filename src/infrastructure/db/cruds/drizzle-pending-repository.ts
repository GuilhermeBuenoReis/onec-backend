import { Pending } from '../../../domain/entities/Pending';
import type { PendingRepository } from '../../../domain/repositories/Pending';
import { db } from '..';
import { pendingTable } from '../schema';
import { eq } from 'drizzle-orm';

export class DrizzlePendingRepository implements PendingRepository {
  async create(pendingData: Omit<Pending, 'id'>): Promise<Pending | null> {
    const pending = new Pending(
      undefined,
      pendingData.client,
      pendingData.callReason,
      pendingData.status,
      pendingData.priority,
      pendingData.responsible,
      pendingData.category,
      pendingData.description,
      pendingData.createdAt,
      pendingData.updatedAt
    );

    const response = await db
      .insert(pendingTable)
      .values({
        client: pending.client,
        callReason: pending.callReason,
        status: pending.status,
        priority: pending.priority,
        responsible: pending.responsible,
        category: pending.category,
        description: pending.description,
      })
      .returning();

    const createdPending = response[0];

    if (!createdPending) {
      throw new Error('Dados do parceiro incorretos!');
    }

    return createdPending;
  }

  async select(): Promise<Pending[]> {
    const response = await db
      .select({
        id: pendingTable.id,
        client: pendingTable.client,
        callReason: pendingTable.callReason,
        status: pendingTable.status,
        priority: pendingTable.priority,
        responsible: pendingTable.responsible,
        category: pendingTable.category,
        description: pendingTable.description,
        createdAt: pendingTable.createdAt,
        updatedAt: pendingTable.updatedAt,
      })
      .from(pendingTable);

    return response;
  }

  async update(
    id: string,
    pendingData: Partial<Omit<Pending, 'id'>>
  ): Promise<Pending | null> {
    const response = await db
      .update(pendingTable)
      .set(pendingData)
      .where(eq(pendingTable.id, id))
      .returning();

    return response[0] ?? null;
  }

  async delete(id: string): Promise<boolean> {
    const response = await db
      .delete(pendingTable)
      .where(eq(pendingTable.id, id))
      .returning();

    return response.length > 0;
  }
}
