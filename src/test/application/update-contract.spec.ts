import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryContractRepository } from '../../domain/repositories/memory/inMemoryContractRepository';
import { Contract } from '../../domain/entities/Contracts';
import { InMemoryStatusRepository } from '../../domain/repositories/memory/InMemoryStatusRepository';

describe('create a new contract', () => {
  let repository: InMemoryContractRepository;
  let statusRepository: InMemoryStatusRepository;

  beforeEach(() => {
    repository = new InMemoryContractRepository();
    statusRepository = new InMemoryStatusRepository();
  });

  it('should be possible to update the contract', async () => {
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

    await repository.create(contract);

    const updatedData = { city: 'Nova Cidade' };
    const result = await repository.update('1', updatedData);

    expect(result).not.toBeNull();
    if (result) {
      expect(result.city).toBe('Nova Cidade');
    }
  });

  it('should return null when trying to update a non-existent contract', async () => {
    const updatedData = { city: 'Cidade Inexistente' };
    const result = await repository.update('999', updatedData);

    expect(result).toBeNull();
  });

  it('should throw an error when trying to update a contract without an id', async () => {
    await expect(
      repository.update('', { city: 'Nova Cidade' })
    ).rejects.toThrowError('Não foi encontrado o contrato para atualizar!');
  });
});
