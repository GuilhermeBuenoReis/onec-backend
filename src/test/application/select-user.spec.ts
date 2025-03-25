import { describe, it, expect } from 'vitest';
import { InMemoryUserRepository } from '../../domain/repositories/memory/InMemoryUserRepository';

describe('Select User', () => {
  it('should select an existing user by id', async () => {
    const repository = new InMemoryUserRepository();

    const user1 = {
      email: 'user@example.com',
      passwordHash: 'hashedpassword123',
      role: 'admin',
    };

    const user2 = {
      email: 'user2@example.com',
      passwordHash: 'hashedpassword123',
      role: 'admin',
    };

    const createdUser = await repository.create(user1);
    const createdUser2 = await repository.create(user2);
    if (!createdUser) {
      throw new Error('Falha na criação do usuário');
    }

    const selectUsers = await repository.select();

    expect(selectUsers).toEqual(
      expect.arrayContaining([createdUser, createdUser2])
    );
  });
});
