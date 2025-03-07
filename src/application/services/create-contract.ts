import { Contract } from '../../domain/entities/contracts';
import type { ContractRepository } from '../../domain/repositories/Contract';

export class CreateContract {
  constructor(private contractRepository: ContractRepository) {}

  async create({
    id,
    city,
    client,
    state,
    cnpj,
    sindic,
    year,
    matter,
    forecast,
    contractTotal,
    percentage,
    signedContract,
    status,
    averageGuide,
    partner,
    partnerCommission,
    counter,
    email,
  }: Contract): Promise<Contract | null> {
    const contract = new Contract(
      id,
      city,
      client,
      state,
      cnpj,
      sindic,
      year,
      matter,
      forecast,
      contractTotal,
      percentage,
      signedContract,
      status,
      averageGuide,
      partner,
      partnerCommission,
      counter,
      email
    );

    if (contract.client) {
      throw new Error('O cliente é obrigatório!');
    }

    return await this.contractRepository.create(contract);
  }
}
