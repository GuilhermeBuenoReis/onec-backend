import { Pending } from '../../../domain/entities/Pending';
import type { PendingRepository } from '../../../domain/repositories/Pending';
import { db } from '..';
import { pendingIssues } from '../schema';
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
      .insert(pendingIssues)
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
        id: pendingIssues.id,
        client: pendingIssues.client,
        callReason: pendingIssues.callReason,
        status: pendingIssues.status,
        priority: pendingIssues.priority,
        responsible: pendingIssues.responsible,
        category: pendingIssues.category,
        description: pendingIssues.description,
        createdAt: pendingIssues.createdAt,
        updatedAt: pendingIssues.updatedAt,
      })
      .from(pendingIssues);

    return response;
  }

  async update(
    id: string,
    pendingData: Partial<Omit<Pending, 'id'>>
  ): Promise<Pending | null> {
    const response = await db
      .update(pendingIssues)
      .set(pendingData)
      .where(eq(pendingIssues.id, id))
      .returning();

    return response[0] ?? null;
  }

  async delete(id: string): Promise<boolean> {
    const response = await db
      .delete(pendingIssues)
      .where(eq(pendingIssues.id, id))
      .returning();

    return response.length > 0;
  }

  async selectOnePending(id: string): Promise<Pending | null> {
    const response = await db
      .select({
        id: pendingIssues.id,
        client: pendingIssues.client,
        callReason: pendingIssues.callReason,
        status: pendingIssues.status,
        priority: pendingIssues.priority,
        responsible: pendingIssues.responsible,
        category: pendingIssues.category,
        description: pendingIssues.description,
        createdAt: pendingIssues.createdAt,
        updatedAt: pendingIssues.updatedAt,
      })
      .from(pendingIssues)
      .where(eq(pendingIssues.id, id));

    return response[0] ?? null;
  }
}
