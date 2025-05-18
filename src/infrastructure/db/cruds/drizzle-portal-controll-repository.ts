import { PortalControll } from '../../../domain/entities/Portal-Controlls';
import type { PortalControllRepository } from '../../../domain/repositories/Portal-Controll';
import { db } from '..';
import { portalControls } from '../schema';
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
      portalControllData.tj,
      portalControllData.value,
      portalControllData.situation,
      portalControllData.partnerId
    );

    const response = await db
      .insert(portalControls)
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
        id: portalControls.id,
        monthOfCalculation: portalControls.monthOfCalculation,
        competenceMonth: portalControls.competenceMonth,
        contract: portalControls.contract,
        enterprise: portalControls.enterprise,
        product: portalControls.product,
        percentageHonorary: portalControls.percentageHonorary,
        compensation: portalControls.compensation,
        honorary: portalControls.honorary,
        tax: portalControls.tax,
        tj: portalControls.tj,
        value: portalControls.value,
        situation: portalControls.situation,
        partnerId: portalControls.partnerId,
      })
      .from(portalControls);

    return response.map(item => ({
      ...item,
      partnerId: item.partnerId ?? '',
    }));
  }

  async selectByPartner(partnerId: string): Promise<PortalControll[]> {
    const response = await db
      .select({
        id: portalControls.id,
        monthOfCalculation: portalControls.monthOfCalculation,
        competenceMonth: portalControls.competenceMonth,
        contract: portalControls.contract,
        enterprise: portalControls.enterprise,
        product: portalControls.product,
        percentageHonorary: portalControls.percentageHonorary,
        compensation: portalControls.compensation,
        honorary: portalControls.honorary,
        tax: portalControls.tax,
        tj: portalControls.tj,
        value: portalControls.value,
        situation: portalControls.situation,
        partnerId: portalControls.partnerId,
      })
      .from(portalControls)
      .where(eq(portalControls.partnerId, partnerId));

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
      .update(portalControls)
      .set(portalControll)
      .where(eq(portalControls.id, id))
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
      .delete(portalControls)
      .where(eq(portalControls.id, id))
      .returning();

    return response.length > 0;
  }
}
