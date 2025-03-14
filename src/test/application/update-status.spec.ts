import { describe, it, expect, beforeEach } from 'vitest';
import { Status } from '../../domain/entities/Status';
import { InMemoryStatusRepository } from '../../domain/repositories/memory/InMemoryStatusRepository';

describe('Update Status', () => {
  let repository: InMemoryStatusRepository;

  beforeEach(() => {
    repository = new InMemoryStatusRepository();
  });

  it('should be possible to update the status', async () => {
    const statusData = {
      type: 'Ativo',
      count: 2,
    };

    const status = new Status('1', statusData.type, statusData.count);

    await repository.create(status);

    const updatedData = { type: 'Updated Status', count: 2 };
    const result = await repository.update('1', updatedData);

    expect(result).not.toBeNull();
    if (result) {
      expect(result.type).toBe('Updated Status');
      expect(result.count).toBe(2);
    }
  });

  it('should return null when trying to update a non-existent status', async () => {
    const updatedData = { type: 'Non-existent Status' };
    const result = await repository.update('999', updatedData);
    expect(result).toBeNull();
  });

  it('should throw an error when trying to update a status without an id', async () => {
    await expect(
      repository.update('', { type: 'Updated Status' })
    ).rejects.toThrowError('Não foi encontrado o status para atualizar!');
  });
});
