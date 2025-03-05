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
    partnerCommssion,
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
      partnerCommssion,
      counter,
      email
    );

    return await this.contractRepository.create(contract);
  }
}
