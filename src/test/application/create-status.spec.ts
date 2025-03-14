import { describe, it, expect } from 'vitest';
import { Status } from '../../domain/entities/Status';
import { InMemoryStatusRepository } from '../../domain/repositories/memory/InMemoryStatusRepository';

describe('Create Status', () => {
  it('should create a new status', async () => {
    const statusData = {
      type: 'Atendimento',
      count: 2,
    };

    const status = new Status(undefined, statusData.type, statusData.count);

    const repository = new InMemoryStatusRepository();
    const createdStatus = await repository.create(status);

    expect(createdStatus).toEqual(status);
  });
});
