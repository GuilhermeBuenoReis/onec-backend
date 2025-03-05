import type { ExelDataNegotiation } from '../../domain/entities/ExelDataNegotiation';
import type { ExelDataNegotiationRepository } from '../../domain/repositories/ExelDataNegotiation';

export class UpdateNegotiation {
  constructor(
    private exelDataNegotiationRepository: ExelDataNegotiationRepository
  ) {}

  async execute(
    id: string,
    partnerData: Partial<Omit<ExelDataNegotiation, 'id'>>
  ): Promise<ExelDataNegotiation | null> {
    return await this.exelDataNegotiationRepository.update(id, partnerData);
  }
}
