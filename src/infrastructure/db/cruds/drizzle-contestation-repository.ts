import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import { db } from '..';
import { Contestation } from '../../../domain/entities/Contestation';
import type { ContestationRepository } from '../../../domain/repositories/contestation';
import { contestation } from '../schema';

export class DrizzleContestationRepository implements ContestationRepository {
  async create(data: Omit<Contestation, 'id'>): Promise<Contestation | null> {
    const newContestation = new Contestation(
      undefined,
      data.product,
      data.competence,
      data.cnpj,
      data.client,
      data.percentage,
      data.compensation,
      data.honorary,
      data.tax,
      data.valueTj,
      data.toPay,
      data.status,
      data.observation
    );

    const result = await db
      .insert(contestation)
      .values({
        id: newContestation.id,
        product: newContestation.product,
        competence: newContestation.competence,
        cnpj: newContestation.cnpj,
        client: newContestation.client,
        percentage: newContestation.percentage,
        compensation: newContestation.compensation,
        honorary: newContestation.honorary,
        tax: newContestation.tax,
        valueTj: newContestation.valueTj,
        toPay: newContestation.toPay,
        status: newContestation.status,
        observation: newContestation.observation,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return result[0] ?? null;
  }

  async select(): Promise<Contestation[]> {
    const result = await db
      .select({
        id: contestation.id,
        product: contestation.product,
        competence: contestation.competence,
        cnpj: contestation.cnpj,
        client: contestation.client,
        percentage: contestation.percentage,
        compensation: contestation.compensation,
        honorary: contestation.honorary,
        tax: contestation.tax,
        valueTj: contestation.valueTj,
        toPay: contestation.toPay,
        status: contestation.status,
        observation: contestation.observation,
        createdAt: contestation.createdAt,
        updatedAt: contestation.updatedAt,
      })
      .from(contestation);

    return result;
  }

  async update(
    id: string,
    data: Partial<Contestation>
  ): Promise<Contestation | null> {
    const { createdAt, ...dataWithoutCreatedAt } = data;

    const result = await db
      .update(contestation)
      .set({
        ...dataWithoutCreatedAt,
        updatedAt: new Date(),
      })
      .where(eq(contestation.id, id))
      .returning();

    return result[0] ?? null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await db
      .delete(contestation)
      .where(eq(contestation.id, id))
      .returning();

    return result.length > 0;
  }

  async selectById(id: string): Promise<Contestation | null> {
    const result = await db
      .select({
        id: contestation.id,
        product: contestation.product,
        competence: contestation.competence,
        cnpj: contestation.cnpj,
        client: contestation.client,
        percentage: contestation.percentage,
        compensation: contestation.compensation,
        honorary: contestation.honorary,
        tax: contestation.tax,
        valueTj: contestation.valueTj,
        toPay: contestation.toPay,
        status: contestation.status,
        observation: contestation.observation,
        createdAt: contestation.createdAt,
        updatedAt: contestation.updatedAt,
      })
      .from(contestation)
      .where(eq(contestation.id, id));

    return result[0] ?? null;
  }
}
