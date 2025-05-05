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
}
