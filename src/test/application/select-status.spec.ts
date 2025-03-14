import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryStatusRepository } from '../../domain/repositories/memory/InMemoryStatusRepository';
import { Status } from '../../domain/entities/Status';

describe('select contracs', () => {
  let repository: InMemoryStatusRepository;

  beforeEach(() => {
    repository = new InMemoryStatusRepository();
  });

  it('shoud be able selects all statuss', async () => {
    const statusData = {
      type: 'Ativo',
      count: 2,
    };

    const status1 = new Status(undefined, statusData.type, statusData.count);
    const status2 = new Status(undefined, statusData.type, statusData.count);

    await repository.create(status1);
    await repository.create(status2);

    const result = await repository.select();

    expect(result).toHaveLength(2);
    expect(result).toEqual(expect.arrayContaining([status1, status2]));
  });
});
