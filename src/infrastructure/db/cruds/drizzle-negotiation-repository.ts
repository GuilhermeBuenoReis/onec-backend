import { ExelDataNegotiation } from '../../../domain/entities/Negotiations';
import type { ExelDataNegotiationRepository } from '../../../domain/repositories/Negotiations';
import { db } from '..';
import { negotiations } from '../schema';
import { eq } from 'drizzle-orm';

export class DrizzleExelDataNegotiationRepository
  implements ExelDataNegotiationRepository
{
  async create(
    data: Omit<ExelDataNegotiation, 'id'>
  ): Promise<ExelDataNegotiation> {
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
      .insert(negotiations)
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
        id: negotiations.id,
        title: negotiations.title,
        client: negotiations.client,
        user: negotiations.user,
        tags: negotiations.tags,
        step: negotiations.step,
        status: negotiations.status,
        value: negotiations.value,
        startsDate: negotiations.startsDate,
        observation: negotiations.observation,
        averageGuide: negotiations.averageGuide,
        partnerId: negotiations.partnerId,
      })
      .from(negotiations);

    return response;
  }

  async update(
    id: string,
    data: Partial<ExelDataNegotiation>
  ): Promise<ExelDataNegotiation | null> {
    const response = await db
      .update(negotiations)
      .set(data)
      .where(eq(negotiations.id, id))
      .returning();

    return response[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const response = await db
      .delete(negotiations)
      .where(eq(negotiations.id, id))
      .returning();

    return response.length > 0;
  }

  async upsert(
    data: Omit<ExelDataNegotiation, 'id'>
  ): Promise<ExelDataNegotiation> {
    if (!data.title) {
      const newData = {
        ...data,
        title: `untitled-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      };
      return await this.create(newData);
    }

    const existingRecords = await db
      .select({
        id: negotiations.id,
        title: negotiations.title,
        client: negotiations.client,
        user: negotiations.user,
        tags: negotiations.tags,
        step: negotiations.step,
        status: negotiations.status,
        value: negotiations.value,
        startsDate: negotiations.startsDate,
        observation: negotiations.observation,
        averageGuide: negotiations.averageGuide,
        partnerId: negotiations.partnerId,
      })
      .from(negotiations)
      .where(eq(negotiations.title, data.title))
      .limit(1);

    if (existingRecords.length > 0) {
      const existing = existingRecords[0];

      const updatedData: Partial<ExelDataNegotiation> = {
        title: data.title ?? existing.title,
        client: data.client ?? existing.client,
        user: data.user ?? existing.user,
        tags: data.tags ?? existing.tags,
        step: data.step ?? existing.step,
        status: data.status ?? existing.status,
        value: data.value ?? existing.value,
        startsDate: data.startsDate ?? existing.startsDate,
        observation: data.observation ?? existing.observation,
        partnerId: data.partnerId ?? existing.partnerId,
        averageGuide: data.averageGuide ?? existing.averageGuide,
      };

      const updatedRecords = await db
        .update(negotiations)
        .set(updatedData)
        .where(eq(negotiations.id, existing.id))
        .returning();

      return updatedRecords[0];
    }

    return await this.create(data);
  }

  async selectById(id: string): Promise<ExelDataNegotiation[]> {
    const response = await db
      .select({
        id: negotiations.id,
        title: negotiations.title,
        client: negotiations.client,
        user: negotiations.user,
        tags: negotiations.tags,
        step: negotiations.step,
        status: negotiations.status,
        value: negotiations.value,
        startsDate: negotiations.startsDate,
        observation: negotiations.observation,
        averageGuide: negotiations.averageGuide,
        partnerId: negotiations.partnerId,
      })
      .from(negotiations)
      .where(eq(negotiations.id, id));

    return response;
  }
}
