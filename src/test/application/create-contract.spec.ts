import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryContractRepository } from '../../domain/repositories/memory/inMemoryContractRepository';
import { Contract } from '../../domain/entities/contracts';

describe('create a new contract', () => {
  let repository: InMemoryContractRepository;

  beforeEach(() => {
    repository = new InMemoryContractRepository();
  });

  it('shoud be able create a new contract', async () => {
    const contractData = {
      id: '1',
      city: 'Cidade Exemplo',
      client: 'Cliente Exemplo',
      state: 'Estado Exemplo',
      cnpj: '00.000.000/0000-00',
      sindic: 'Sindic Exemplo',
      year: '2025',
      matter: 'Matéria Exemplo',
      forecast: 'Previsão Exemplo',
      contractTotal: '10000',
      percentage: 15,
      signedContract: new Date().toISOString(),
      status: 'Ativo',
      averageGuide: 500,
      partner: 'Parceiro Exemplo',
      partnerCommission: 5,
      counter: '1',
      email: 'email@exemplo.com',
    };

    const contract = new Contract(
      contractData.id,
      contractData.city,
      contractData.client,
      contractData.state,
      contractData.cnpj,
      contractData.sindic,
      contractData.year,
      contractData.matter,
      contractData.forecast,
      contractData.contractTotal,
      contractData.percentage,
      contractData.signedContract,
      contractData.status,
      contractData.averageGuide,
      contractData.partner,
      contractData.partnerCommission,
      contractData.counter,
      contractData.email
    );
    const result = await repository.create(contract);

    expect(result).toEqual(contract);
    expect(repository['contracts']).toHaveLength(1);
  });
  it('shoud not be able to create if you dont have a client', async () => {
    const contractData = {
      id: '1',
      city: 'Cidade Exemplo',
      client: '',
      state: 'Estado Exemplo',
      cnpj: '00.000.000/0000-00',
      sindic: 'Sindic Exemplo',
      year: '2025',
      matter: 'Matéria Exemplo',
      forecast: 'Previsão Exemplo',
      contractTotal: '10000',
      percentage: 15,
      signedContract: new Date().toISOString(),
      status: 'Ativo',
      averageGuide: 500,
      partner: 'Parceiro Exemplo',
      partnerCommission: 5,
      counter: '1',
      email: 'email@exemplo.com',
    };

    expect(() => {
      new Contract(
        contractData.id,
        contractData.city,
        contractData.client,
        contractData.state,
        contractData.cnpj,
        contractData.sindic,
        contractData.year,
        contractData.matter,
        contractData.forecast,
        contractData.contractTotal,
        contractData.percentage,
        contractData.signedContract,
        contractData.status,
        contractData.averageGuide,
        contractData.partner,
        contractData.partnerCommission,
        contractData.counter,
        contractData.email
      );
    }).toThrowError('Erro ao encontrar o cliente!');
  });
});
