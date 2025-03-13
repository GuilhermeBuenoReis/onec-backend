import { describe, it, expect, beforeEach } from 'vitest';
import {
  type categoryType,
  Pending,
  type statusType,
} from '../../domain/entities/Pending';
import { InMemoryPendingRepository } from '../../domain/repositories/memory/InMemoryPendingRepository';

describe('Update Pending', () => {
  let repository: InMemoryPendingRepository;

  beforeEach(() => {
    repository = new InMemoryPendingRepository();
  });

  it('should be possible to update the pending', async () => {
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

    const updatedData = { client: 'Updated Pending', priority: 'Alta' };
    const result = await repository.update('1', updatedData);

    expect(result).not.toBeNull();
    if (result) {
      expect(result.client).toBe('Updated Pending');
      expect(result.priority).toBe('Alta');
    }
  });

  it('should return null when trying to update a non-existent pending', async () => {
    const updatedData = { client: 'Non-existent Pending' };
    const result = await repository.update('999', updatedData);
    expect(result).toBeNull();
  });

  it('should throw an error when trying to update a pending without an id', async () => {
    await expect(
      repository.update('', { client: 'Updated Pending' })
    ).rejects.toThrowError('Não foi encontrado o chamado para atualizar!');
  });
});
