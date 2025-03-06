import type { ExelDataNegotiation } from '../../../domain/entities/ExelDataNegotiation';
import type { ExelDataNegotiationRepository } from '../../../domain/repositories/ExelDataNegotiation';
import { db } from '..';
import { excelDataNegotiationTable } from '../schema';
import { eq } from 'drizzle-orm';

export class DrizzleExelDataNegotiationRepository
  implements ExelDataNegotiationRepository
{
  async create({
    partnerId,
    ...data
  }: Omit<ExelDataNegotiation, 'id'>): Promise<ExelDataNegotiation | null> {
    const response = await db
      .insert(excelDataNegotiationTable)
      .values({
        title: data.title,
        client: data.client,
        user: data.user,
        tags: data.tags,
        step: data.step,
        status: data.status,
        value: data.value,
        startsDate: data.startsDate,
        observation: data.observation,
        averageGuide: data.averageGuide,
        partnerId,
      })
      .returning();

    const dataNegotiation = response[0];

    if (!dataNegotiation) {
      throw new Error('Dados do parceiro incorretos!');
    }

    return dataNegotiation;
  }

  async select(): Promise<ExelDataNegotiation[]> {
    const response = await db
      .select({
        id: excelDataNegotiationTable.id,
        title: excelDataNegotiationTable.title,
        client: excelDataNegotiationTable.client,
        user: excelDataNegotiationTable.user,
        tags: excelDataNegotiationTable.tags,
        step: excelDataNegotiationTable.step,
        status: excelDataNegotiationTable.status,
        value: excelDataNegotiationTable.value,
        startsDate: excelDataNegotiationTable.startsDate,
        observation: excelDataNegotiationTable.observation,
        averageGuide: excelDataNegotiationTable.averageGuide,
        partnerId: excelDataNegotiationTable.partnerId,
      })
      .from(excelDataNegotiationTable);

    return response;
  }

  async update(
    id: string,
    data: Partial<ExelDataNegotiation>
  ): Promise<ExelDataNegotiation | null> {
    const response = await db
      .update(excelDataNegotiationTable)
      .set(data)
      .where(eq(excelDataNegotiationTable.id, id))
      .returning();

    return response[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const response = await db
      .delete(excelDataNegotiationTable)
      .where(eq(excelDataNegotiationTable.id, id))
      .returning();

    return response.length > 0;
  }
}
