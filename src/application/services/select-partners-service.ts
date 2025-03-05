import type { Partner } from '../../domain/entities/Partner';
import type { PartnerRepository } from '../../domain/repositories/Partner';

export class SelectPartner {
  constructor(private partnerRepository: PartnerRepository) {}

  async execute(): Promise<Partner[]> {
    return await this.partnerRepository.select();
  }
}
