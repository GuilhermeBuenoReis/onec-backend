import { describe, it, expect } from 'vitest';
import {
  type categoryType,
  Pending,
  type statusType,
} from '../../domain/entities/Pending';
import { InMemoryPendingRepository } from '../../domain/repositories/memory/InMemoryPendingRepository';

describe('Create Pending', () => {
  it('should create a new pending with valid data', async () => {
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
      undefined,
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

    const repository = new InMemoryPendingRepository();
    const createdPending = await repository.create(pending);

    expect(createdPending).toEqual(pending);
  });
});
