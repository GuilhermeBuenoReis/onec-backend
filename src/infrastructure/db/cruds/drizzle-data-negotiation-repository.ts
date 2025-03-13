import { ExelDataNegotiation } from '../../../domain/entities/ExelDataNegotiation';
import type { ExelDataNegotiationRepository } from '../../../domain/repositories/ExelDataNegotiation';
import { db } from '..';
import { excelDataNegotiationTable } from '../schema';
import { eq } from 'drizzle-orm';

export class DrizzleExelDataNegotiationRepository
  implements ExelDataNegotiationRepository
{
  async create(
    data: Omit<ExelDataNegotiation, 'id'>
  ): Promise<ExelDataNegotiation | null> {
    const negotiation = new ExelDataNegotiation(
      undefined,
      data.title,
      data.client,
      data.user,
      data.tags,
      data.status,
      data.step,
      data.value,
      data.startsDate,
      data.observation,
      data.partnerId,
      data.averageGuide
    );

    const response = await db
      .insert(excelDataNegotiationTable)
      .values({
        title: negotiation.title,
        client: negotiation.client,
        user: negotiation.user,
        tags: negotiation.tags,
        step: negotiation.step,
        status: negotiation.status,
        value: negotiation.value,
        startsDate: negotiation.startsDate,
        observation: negotiation.observation,
        partnerId: negotiation.partnerId,
        averageGuide: negotiation.averageGuide,
      })
      .returning();

    const createdNegotiation = response[0];

    if (!createdNegotiation) {
      throw new Error('Dados da negociação incorretos!');
    }

    return createdNegotiation;
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
