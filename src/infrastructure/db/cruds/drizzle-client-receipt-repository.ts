import { eq } from 'drizzle-orm';
import { db } from '..';
import { clientReceipt } from '../schema';
import type { ClientReceiptRepository } from '../../../domain/repositories/Client-Receipt';
import { ClientReceipt } from '../../../domain/entities/Client-Receipt';

export class DrizzleClientReceiptRepository implements ClientReceiptRepository {
  async create(data: Omit<ClientReceipt, 'id'>): Promise<ClientReceipt | null> {
    const newClientReceipt = new ClientReceipt(
      undefined,
      data.receiptDate,
      data.competence,
      data.cnpj,
      data.clientName,
      data.percentage,
      data.compensationMonth,
      data.honorary,
      data.tax,
      data.status
    );

    const response = await db
      .insert(clientReceipt)
      .values(newClientReceipt)
      .returning();

    const clientReceiptReponse = response[0];

    return clientReceiptReponse;
  }

  async select(): Promise<ClientReceipt[]> {
    const response = await db.select().from(clientReceipt);
    return response;
  }

  async update(
    id: string,
    data: Partial<ClientReceipt>
  ): Promise<ClientReceipt | null> {
    const response = await db
      .update(clientReceipt)
      .set(data)
      .where(eq(clientReceipt.id, id))
      .returning();

    return response[0];
  }

  async delete(id: string): Promise<boolean> {
    const response = await db
      .delete(clientReceipt)
      .where(eq(clientReceipt.id, id))
      .returning();

    return response.length > 0;
  }
}
