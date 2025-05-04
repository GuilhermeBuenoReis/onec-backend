import { PortalControll } from '../../../domain/entities/portal-controll';
import type { PortalControllRepository } from '../../../domain/repositories/Portal-Controll';
import { db } from '..';
import { portalControllTable } from '../schema';
import { eq, sql } from 'drizzle-orm';

export class DrizzlePortalControllRepository
  implements PortalControllRepository
{
  async create(
    portalControllData: Omit<PortalControll, 'id'>
  ): Promise<PortalControll | null> {
    const portalControll = new PortalControll(
      undefined,
      portalControllData.monthOfCalculation,
      portalControllData.competenceMonth,
      portalControllData.contract,
      portalControllData.enterprise,
      portalControllData.product,
      portalControllData.percentageHonorary,
      portalControllData.compensation,
      portalControllData.honorary,
      portalControllData.tax,
      portalControllData.tj,
      portalControllData.value,
      portalControllData.situation,
      portalControllData.partnerId
    );

    const response = await db
      .insert(portalControllTable)
      .values({
        id: portalControll.id,
        monthOfCalculation: portalControll.monthOfCalculation,
        competenceMonth: portalControll.competenceMonth,
        contract: portalControll.contract,
        enterprise: portalControll.enterprise,
        product: portalControll.product,
        percentageHonorary: portalControll.percentageHonorary,
        compensation: portalControll.compensation,
        honorary: portalControll.honorary,
        tax: portalControll.tax,
        tj: portalControll.tj,
        value: portalControll.value,
        situation: portalControll.situation,
        partnerId: portalControll.partnerId,
      })
      .returning();

    const created = response[0];
    if (!created) {
      throw new Error('Falha ao criar controle de portal.');
    }
    return {
      ...created,
      partnerId: created.partnerId ?? '',
    };
  }

  async select(): Promise<PortalControll[]> {
    const response = await db
      .select({
        id: portalControllTable.id,
        monthOfCalculation: portalControllTable.monthOfCalculation,
        competenceMonth: portalControllTable.competenceMonth,
        contract: portalControllTable.contract,
        enterprise: portalControllTable.enterprise,
        product: portalControllTable.product,
        percentageHonorary: portalControllTable.percentageHonorary,
        compensation: portalControllTable.compensation,
        honorary: portalControllTable.honorary,
        tax: portalControllTable.tax,
        tj: portalControllTable.tj,
        value: portalControllTable.value,
        situation: portalControllTable.situation,
        partnerId: portalControllTable.partnerId,
      })
      .from(portalControllTable);

    return response.map(item => ({
      ...item,
      partnerId: item.partnerId ?? '',
    }));
  }

  async selectByPartner(partnerId: string): Promise<PortalControll[]> {
    const response = await db
      .select({
        id: portalControllTable.id,
        monthOfCalculation: portalControllTable.monthOfCalculation,
        competenceMonth: portalControllTable.competenceMonth,
        contract: portalControllTable.contract,
        enterprise: portalControllTable.enterprise,
        product: portalControllTable.product,
        percentageHonorary: portalControllTable.percentageHonorary,
        compensation: portalControllTable.compensation,
        honorary: portalControllTable.honorary,
        tax: portalControllTable.tax,
        tj: portalControllTable.tj,
        value: portalControllTable.value,
        situation: portalControllTable.situation,
        partnerId: portalControllTable.partnerId,
      })
      .from(portalControllTable)
      .where(eq(portalControllTable.partnerId, partnerId));

    return response.map(item => ({
      ...item,
      partnerId: item.partnerId ?? '',
    }));
  }

  async update(
    id: string,
    portalControll: Partial<Omit<PortalControll, 'id'>>
  ): Promise<PortalControll | null> {
    const response = await db
      .update(portalControllTable)
      .set(portalControll)
      .where(eq(portalControllTable.id, id))
      .returning();

    const updated = response[0];
    if (!updated) {
      return null;
    }
    return {
      ...updated,
      partnerId: updated.partnerId ?? '',
    };
  }

  async delete(id: string): Promise<boolean> {
    const response = await db
      .delete(portalControllTable)
      .where(eq(portalControllTable.id, id))
      .returning();

    return response.length > 0;
  }

  async count(): Promise<number> {
    const [{ count }] = await db
      .select({ count: sql /*sql */`COUNT(*)` })
      .from(portalControllTable);
    return Number(count);
  }

  async deleteByCompetenceMonth(month: string): Promise<number> {
    const deleted = await db
      .delete(portalControllTable)
      .where(eq(portalControllTable.competenceMonth, month));
    return deleted.length;
  }

  async bulkCreate(data: PortalControll[]): Promise<PortalControll[]> {
    const inserted = await db
      .insert(portalControllTable)
      .values(data)
      .returning();
    return inserted.map(item => ({
      ...item,
      partnerId: item.partnerId ?? '',
    }));
  }

  async upsert(
    data: Omit<PortalControll, 'createdAt' | 'updatedAt'>
  ): Promise<PortalControll> {
    const inserted = await db
      .insert(portalControllTable)
      .values({
        id: data.id,
        monthOfCalculation: data.monthOfCalculation,
        competenceMonth: data.competenceMonth,
        contract: data.contract,
        enterprise: data.enterprise,
        product: data.product,
        percentageHonorary: data.percentageHonorary,
        compensation: data.compensation,
        honorary: data.honorary,
        tax: data.tax,
        value: data.value,
        situation: data.situation,
        partnerId: data.partnerId,
      })
      .onConflictDoUpdate({
        target: portalControllTable.id,
        set: {
          monthOfCalculation: sql`COALESCE(EXCLUDED.month_of_calculation, ${portalControllTable.monthOfCalculation})`,
          competenceMonth: sql`COALESCE(EXCLUDED.competence_month, ${portalControllTable.competenceMonth})`,
          contract: sql`COALESCE(EXCLUDED.contract, ${portalControllTable.contract})`,
          enterprise: sql`COALESCE(EXCLUDED.enterprise, ${portalControllTable.enterprise})`,
          product: sql`COALESCE(EXCLUDED.product, ${portalControllTable.product})`,
          percentageHonorary: sql`COALESCE(EXCLUDED.percentage_honorary, ${portalControllTable.percentageHonorary})`,
          compensation: sql`COALESCE(EXCLUDED.compensation, ${portalControllTable.compensation})`,
          honorary: sql`COALESCE(EXCLUDED.honorary, ${portalControllTable.honorary})`,
          tax: sql`COALESCE(EXCLUDED.tax, ${portalControllTable.tax})`,
          value: sql`COALESCE(EXCLUDED.value, ${portalControllTable.value})`,
          situation: sql`COALESCE(EXCLUDED.situation, ${portalControllTable.situation})`,
          partnerId: sql`COALESCE(EXCLUDED.partner_id, ${portalControllTable.partnerId})`,
          updatedAt: sql`NOW()`,
        },
      })
      .returning();

    const row = inserted[0];
    if (!row) {
      throw new Error('Falha no upsert de PortalControll');
    }
    return {
      ...row,
      partnerId: row.partnerId ?? '',
    };
  }
}
