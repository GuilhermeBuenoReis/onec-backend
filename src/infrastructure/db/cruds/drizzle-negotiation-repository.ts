import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import { db } from '..';
import { ExelDataNegotiation } from '../../../domain/entities/Negotiations';
import type { ExelDataNegotiationRepository } from '../../../domain/repositories/Negotiations';
import { contracts, negotiations } from '../schema';

export class DrizzleExelDataNegotiationRepository
  implements ExelDataNegotiationRepository
{
  async create(
    data: Omit<ExelDataNegotiation, 'id'> & { referenceId?: string }
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

    const existingContract = data.client
      ? await db
          .select({ referenceId: contracts.referenceId })
          .from(contracts)
          .where(eq(contracts.client, data.client))
          .limit(1)
      : [];

    const referenceId = existingContract.at(0)?.referenceId ?? createId();

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
        referenceId,
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
        createdAt: negotiations.createdAt,
        updatedAt: negotiations.updatedAt,
        referenceId: negotiations.referenceId,
      })
      .from(negotiations);

    return response;
  }

  async update(
    id: string,
    data: Partial<ExelDataNegotiation>
  ): Promise<ExelDataNegotiation | null> {
    const { createdAt, ...dataWithoutCreatedAt } = data;

    const response = await db
      .update(negotiations)
      .set({
        ...dataWithoutCreatedAt,
        updatedAt: new Date(),
      })
      .where(eq(negotiations.id, id))
      .returning({
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
        createdAt: negotiations.createdAt,
        updatedAt: negotiations.updatedAt,
        referenceId: negotiations.referenceId,
      });

    return response[0] ?? null;
  }

  async delete(id: string): Promise<boolean> {
    const response = await db
      .delete(negotiations)
      .where(eq(negotiations.id, id))
      .returning();

    return response.length > 0;
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
        createdAt: negotiations.createdAt,
        updatedAt: negotiations.updatedAt,
        referenceId: negotiations.referenceId,
      })
      .from(negotiations)
      .where(eq(negotiations.id, id));

    return response;
  }
}
