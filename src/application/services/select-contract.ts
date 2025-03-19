import type { Contract } from '../../domain/entities/Contract';
import type { ContractRepository } from '../../domain/repositories/Contract';

export class SelectContract {
  constructor(private contractRepository: ContractRepository) {}

  async execute(): Promise<Contract[]> {
    return await this.contractRepository.select();
  }
}
