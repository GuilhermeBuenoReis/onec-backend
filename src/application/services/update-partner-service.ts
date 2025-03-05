import type { Partner } from '../../domain/entities/Partner';
import type { PartnerRepository } from '../../domain/repositories/Partner';

export class UpdatePartner {
  constructor(private partnerRepository: PartnerRepository) {}

  async execute(
    id: string,
    partnerData: Partial<Omit<Partner, 'id'>>
  ): Promise<Partner | null> {
    return await this.partnerRepository.update(id, partnerData);
  }
}
