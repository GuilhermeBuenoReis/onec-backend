import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPendingRepository } from '../../domain/repositories/memory/InMemoryPendingRepository';
import {
  type categoryType,
  Pending,
  type statusType,
} from '../../domain/entities/Pending';

describe('select contracs', () => {
  let repository: InMemoryPendingRepository;

  beforeEach(() => {
    repository = new InMemoryPendingRepository();
  });

  it('shoud be able selects all pendings', async () => {
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

    const pending1 = new Pending(
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
    const pending2 = new Pending(
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

    await repository.create(pending1);
    await repository.create(pending2);

    const result = await repository.select();

    expect(result).toHaveLength(2);
    expect(result).toEqual(expect.arrayContaining([pending1, pending2]));
  });
});
