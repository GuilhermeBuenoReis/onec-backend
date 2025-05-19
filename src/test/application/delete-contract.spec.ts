import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryContractRepository } from '../../domain/repositories/memory/inMemoryContractRepository';
import { Contract } from '../../domain/entities/Contract';

describe('delete a contract', () => {
  let repository: InMemoryContractRepository;

  beforeEach(() => {
    repository = new InMemoryContractRepository();
  });

  it('should be possible to delete the contract', async () => {
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
      averageGuide: 500,
      partner: 'Parceiro Exemplo',
      partnerCommission: 5,
      counter: '1',
      email: 'email@exemplo.com',
      status: 'Ativo',
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

    await repository.create(contract);
    const deletionResult = await repository.delete('1');
    expect(deletionResult).toBe(true);

    const contracts = await repository.select();
    const found = contracts.find(c => c.id === '1');
    expect(found).toBeUndefined();
  });

  it('should return false when trying to delete a non-existent contract', async () => {
    const deletionResult = await repository.delete('999');
    expect(deletionResult).toBe(false);
  });

  it('should throw an error when trying to delete a contract without an id', async () => {
    await expect(repository.delete('')).rejects.toThrowError(
      'Não foi encontrado o contrato para ser deletado!'
    );
  });
});
