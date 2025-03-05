import type { ContractRepository } from '../../domain/repositories/Contract';

export class DeleteContract {
  constructor(private contractRepository: ContractRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.contractRepository.delete(id);
  }
}
