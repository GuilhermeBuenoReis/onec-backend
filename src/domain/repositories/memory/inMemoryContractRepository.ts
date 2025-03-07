import type { Contract } from '../../entities/contracts';
import type { ContractRepository } from '../../repositories/Contract';

export class InMemoryContractRepository implements ContractRepository {
  private contracts: Contract[] = [];

  async create(contract: Contract): Promise<Contract> {
    this.contracts.push(contract);
    return contract;
  }

  async select(): Promise<Contract[]> {
    return this.contracts;
  }

  async update(id: string, data: Partial<Contract>): Promise<Contract | null> {
    if (!id || id.trim() === '') {
      throw new Error('Não foi encontrado o contrato para atualizar!');
    }
    const contractIndex = this.contracts.findIndex(
      contract => contract.id === id
    );
    if (contractIndex === -1) {
      return null;
    }
    const updatedContract = { ...this.contracts[contractIndex], ...data };
    this.contracts[contractIndex] = updatedContract;
    return updatedContract;
  }

  async delete(id: string): Promise<boolean> {
    if (!id || id.trim() === '') {
      throw new Error('Não foi encontrado o contrato para ser deletado!');
    }
    const contractIndex = this.contracts.findIndex(
      contract => contract.id === id
    );
    if (contractIndex === -1) {
      return false;
    }
    this.contracts.splice(contractIndex, 1);
    return true;
  }
}
