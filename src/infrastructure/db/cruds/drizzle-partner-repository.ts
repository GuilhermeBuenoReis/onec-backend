import { Partner } from '../../../domain/entities/Partner';
import type { PartnerRepository } from '../../../domain/repositories/Partner';
import { db } from '..';
import { partners } from '../schema';
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
      .insert(partners)
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
        id: partners.id,
        name: partners.name,
        cpfOrCnpj: partners.cpfOrCnpj,
        city: partners.city,
        state: partners.state,
        commission: partners.commission,
        portal: partners.portal,
        channelHead: partners.channelHead,
        regional: partners.regional,
        coordinator: partners.coordinator,
        agent: partners.agent,
        indicator: partners.indicator,
        contract: partners.contract,
        phone: partners.phone,
        email: partners.email,
        responsible: partners.responsible,
      })
      .from(partners);

    return response;
  }

  async update(
    id: string,
    partnerData: Partial<Omit<Partner, 'id'>>
  ): Promise<Partner | null> {
    const response = await db
      .update(partners)
      .set(partnerData)
      .where(eq(partners.id, id))
      .returning();

    return response[0] ?? null;
  }

  async delete(id: string): Promise<boolean> {
    const response = await db
      .delete(partners)
      .where(eq(partners.id, id))
      .returning();

    return response.length > 0;
  }

  async selectOnePartner(id: string): Promise<Partner | null> {
    const response = await db
      .select({
        id: partners.id,
        name: partners.name,
        cpfOrCnpj: partners.cpfOrCnpj,
        city: partners.city,
        state: partners.state,
        commission: partners.commission,
        portal: partners.portal,
        channelHead: partners.channelHead,
        regional: partners.regional,
        coordinator: partners.coordinator,
        agent: partners.agent,
        indicator: partners.indicator,
        contract: partners.contract,
        phone: partners.phone,
        email: partners.email,
        responsible: partners.responsible,
      })
      .from(partners)
      .where(eq(partners.id, id));

    return response[0] ?? null;
  }
}
