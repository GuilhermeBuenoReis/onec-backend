import { db } from '../index';
import { clientReceipt } from '../schema/client-receipt';
import type { ClientReceiptRepository } from '@/core/repositories/client-receipt-repository';
import type { ClientReceipt } from '@/core/entities/client-receipt';
import { eq } from 'drizzle-orm';

export class DrizzleClientReceiptRepository implements ClientReceiptRepository {
  async create(data: ClientReceipt): Promise<void> {
    await db.insert(clientReceipt).values(data);
  }

  async findAll(): Promise<ClientReceipt[]> {
    return db.select().from(clientReceipt);
  }

  async update(id: string, data: Partial<ClientReceipt>): Promise<void> {
    await db.update(clientReceipt).set(data).where(eq(clientReceipt.id, id));
  }

  async delete(id: string): Promise<void> {
    await db.delete(clientReceipt).where(eq(clientReceipt.id, id));
  }
}
