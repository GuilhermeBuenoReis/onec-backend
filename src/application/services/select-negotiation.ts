import type { ExelDataNegotiation } from '../../domain/entities/ExelDataNegotiation';
import type { ExelDataNegotiationRepository } from '../../domain/repositories/ExelDataNegotiation';

export class SelectNegotiation {
  constructor(
    private exelDataNegotiationRepository: ExelDataNegotiationRepository
  ) {}

  async execute(): Promise<ExelDataNegotiation[]> {
    return await this.exelDataNegotiationRepository.select();
  }
}
