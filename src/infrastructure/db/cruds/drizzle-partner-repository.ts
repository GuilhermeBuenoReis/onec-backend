import { Partner } from '../../../domain/entities/Partner';
import type { PartnerRepository } from '../../../domain/repositories/Partner';
import { db } from '..';
import { partnerTable } from '../schema';
import { eq } from 'drizzle-orm';

export class DrizzlePartnerRepository implements PartnerRepository {
  async create(partnerData: Omit<Partner, 'id'>): Promise<Partner | null> {
    const partner = new Partner(
      undefined,
      partnerData.name,
      partnerData.cpfOrCnpj,
      partnerData.city,
      partnerData.state,
      partnerData.commission,
      partnerData.portal,
      partnerData.channelHead,
      partnerData.regional,
      partnerData.coordinator,
      partnerData.agent,
      partnerData.indicator,
      partnerData.contract,
      partnerData.phone,
      partnerData.email,
      partnerData.responsible
    );

    const response = await db
      .insert(partnerTable)
      .values({
        id: partner.id,
        name: partner.name,
        cpfOrCnpj: partner.cpfOrCnpj,
        city: partner.city,
        state: partner.state,
        commission: partner.commission,
        portal: partner.portal,
        channelHead: partner.channelHead,
        regional: partner.regional,
        coordinator: partner.coordinator,
        agent: partner.agent,
        indicator: partner.indicator,
        contract: partner.contract,
        phone: partner.phone,
        email: partner.email,
        responsible: partner.responsible,
      })
      .returning();

    const createdPartner = response[0];

    if (!createdPartner) {
      throw new Error('Dados do parceiro incorretos!');
    }

    return createdPartner;
  }

  async select(): Promise<Partner[]> {
    const response = await db
      .select({
        id: partnerTable.id,
        name: partnerTable.name,
        cpfOrCnpj: partnerTable.cpfOrCnpj,
        city: partnerTable.city,
        state: partnerTable.state,
        commission: partnerTable.commission,
        portal: partnerTable.portal,
        channelHead: partnerTable.channelHead,
        regional: partnerTable.regional,
        coordinator: partnerTable.coordinator,
        agent: partnerTable.agent,
        indicator: partnerTable.indicator,
        contract: partnerTable.contract,
        phone: partnerTable.phone,
        email: partnerTable.email,
        responsible: partnerTable.responsible,
      })
      .from(partnerTable);

    return response;
  }

  async update(
    id: string,
    partnerData: Partial<Omit<Partner, 'id'>>
  ): Promise<Partner | null> {
    const response = await db
      .update(partnerTable)
      .set(partnerData)
      .where(eq(partnerTable.id, id))
      .returning();

    return response[0] ?? null;
  }

  async delete(id: string): Promise<boolean> {
    const response = await db
      .delete(partnerTable)
      .where(eq(partnerTable.id, id))
      .returning();

    return response.length > 0;
  }
}
