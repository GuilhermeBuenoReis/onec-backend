import { describe, it, expect, beforeEach } from 'vitest';
import {
  type categoryType,
  Pending,
  type statusType,
} from '../../domain/entities/Pending';
import { InMemoryPendingRepository } from '../../domain/repositories/memory/InMemoryPendingRepository';

describe('Delete Pending', () => {
  let repository: InMemoryPendingRepository;

  beforeEach(() => {
    repository = new InMemoryPendingRepository();
  });

  it('should be possible to delete the pending', async () => {
    const pendingData = {
      client: 'Jhon Doe',
      callReason: 'Problema técnico',
      status: 'Aberto' as statusType,
      priority: 'Média',
      responsible: 'Equipe de Suporte',
      category: 'Atendimento' as categoryType,
      description:
        'O cliente relatou um problema técnico que precisa ser resolvido.',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pending = new Pending(
      '1',
      pendingData.client,
      pendingData.callReason,
      pendingData.status,
      pendingData.priority,
      pendingData.responsible,
      pendingData.category,
      pendingData.description,
      pendingData.createdAt,
      pendingData.updatedAt
    );

    await repository.create(pending);

    const deletionResult = await repository.delete('1');
    expect(deletionResult).toBe(true);

    const pendings = await repository.select();
    const found = pendings.find(p => p.id === '1');
    expect(found).toBeUndefined();
  });

  it('should return false when trying to delete a non-existent pending', async () => {
    const deletionResult = await repository.delete('999');
    expect(deletionResult).toBe(false);
  });

  it('should throw an error when trying to delete a pending without an id', async () => {
    await expect(repository.delete('')).rejects.toThrowError(
      'Não foi encontrado o chamado para ser deletado!'
    );
  });
});
