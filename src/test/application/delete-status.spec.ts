import { describe, it, expect, beforeEach } from 'vitest';
import { Status } from '../../domain/entities/Status';
import { InMemoryStatusRepository } from '../../domain/repositories/memory/InMemoryStatusRepository';

describe('Delete Status', () => {
  let repository: InMemoryStatusRepository;

  beforeEach(() => {
    repository = new InMemoryStatusRepository();
  });

  it('should be possible to delete the status', async () => {
    const statusData = {
      type: 'Ativo',
      count: 2,
    };

    const status = new Status('1', statusData.type, statusData.count);

    await repository.create(status);

    const deletionResult = await repository.delete('1');
    expect(deletionResult).toBe(true);

    const statuss = await repository.select();
    const found = statuss.find(p => p.id === '1');
    expect(found).toBeUndefined();
  });

  it('should return false when trying to delete a non-existent status', async () => {
    const deletionResult = await repository.delete('999');
    expect(deletionResult).toBe(false);
  });

  it('should throw an error when trying to delete a status without an id', async () => {
    await expect(repository.delete('')).rejects.toThrowError(
      'Não foi encontrado o status para ser deletado!'
    );
  });
});
