import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryContractRepository } from '../../domain/repositories/memory/inMemoryContractRepository';
import { Contract } from '../../domain/entities/Contract';
import { InMemoryStatusRepository } from '../../domain/repositories/memory/InMemoryStatusRepository';

describe('create a new contract', () => {
  let repository: InMemoryContractRepository;
  let statusRepository: InMemoryStatusRepository;

  beforeEach(() => {
    repository = new InMemoryContractRepository();
    statusRepository = new InMemoryStatusRepository();
  });

  it('shoud be able create a new contract', async () => {
    const status = statusRepository.create({
      id: '123',
      type: 'Ativo',
      count: 2,
    });

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
      statusId: await status,
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
      contractData.statusId,
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
    const status = statusRepository.create({
      id: '123',
      type: 'Ativo',
      count: 2,
    });

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
      statusId: await status,
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
        contractData.statusId,
        contractData.averageGuide,
        contractData.partner,
        contractData.partnerCommission,
        contractData.counter,
        contractData.email
      );
    }).toThrowError('Erro ao encontrar o cliente!');
  });
});
