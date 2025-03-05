import type { PartnerRepository } from '../../domain/repositories/Partner';

export class DeletePartner {
  constructor(private partnerRepository: PartnerRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.partnerRepository.delete(id);
  }
}
