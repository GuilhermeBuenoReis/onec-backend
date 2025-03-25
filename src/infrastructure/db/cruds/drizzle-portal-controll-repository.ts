import { PortalControll } from '../../../domain/entities/portal-controll';
import type { PortalControllRepository } from '../../../domain/repositories/Portal-Controll';
import { db } from '..';
import { portalControllTable } from '../schema';
import { eq } from 'drizzle-orm';

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
      portalControllData.value,
      portalControllData.situation
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
        value: portalControll.value,
        situation: portalControll.situation,
      })
      .returning();

    const createdPending = response[0];

    if (!createdPending) {
      throw new Error('Dados do parceiro incorretos!');
    }

    return createdPending;
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
        value: portalControllTable.value,
        situation: portalControllTable.situation,
      })
      .from(portalControllTable);

    return response;
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

    return response[0] ?? null;
  }

  async delete(id: string): Promise<boolean> {
    const response = await db
      .delete(portalControllTable)
      .where(eq(portalControllTable.id, id))
      .returning();

    return response.length > 0;
  }
}
