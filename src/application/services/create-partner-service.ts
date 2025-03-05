import { Partner } from '../../domain/entities/Partner';
import type { PartnerRepository } from '../../domain/repositories/Partner';

export class PartnerService {
  constructor(private partnerRepository: PartnerRepository) {}

  async create({
    id,
    name,
    cpfOrCnpj,
    city,
    state,
    commission,
    portal,
    channelHead,
    regional,
    coordinator,
    agent,
    indicator,
    contract,
    phone,
    email,
    responsible,
  }: Partner): Promise<Partner | null> {
    const partner = new Partner(
      id,
      name,
      cpfOrCnpj,
      city,
      state,
      commission,
      portal,
      channelHead,
      regional,
      coordinator,
      agent,
      indicator,
      contract,
      phone,
      email,
      responsible
    );

    return await this.partnerRepository.create(partner);
  }
}
