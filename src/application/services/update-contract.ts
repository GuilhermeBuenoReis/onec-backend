import type { Contract } from '../../domain/entities/contracts';
import type { ContractRepository } from '../../domain/repositories/Contract';

export class UpdateContract {
  constructor(private contractRepository: ContractRepository) {}

  async execute(
    id: string,
    partnerData: Partial<Omit<Contract, 'id'>>
  ): Promise<Contract | null> {
    return await this.contractRepository.update(id, partnerData);
  }
}
