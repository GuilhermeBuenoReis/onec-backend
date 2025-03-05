import type { ExelDataNegotiationRepository } from '../../domain/repositories/ExelDataNegotiation';

export class DeleteNegotiation {
  constructor(
    private exelDataNegotiationRepository: ExelDataNegotiationRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    return await this.exelDataNegotiationRepository.delete(id);
  }
}
