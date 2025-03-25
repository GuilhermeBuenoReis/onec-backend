import { describe, it, expect } from 'vitest';
import { InMemoryUserRepository } from '../../domain/repositories/memory/InMemoryUserRepository';

describe('Delete User', () => {
  it('should delete a user by id', async () => {
    const repository = new InMemoryUserRepository();

    const userData = {
      email: 'user@example.com',
      passwordHash: 'hashedpassword123',
      role: 'admin',
    };

    const createdUser = await repository.create(userData);
    if (!createdUser) {
      throw new Error('Falha na criação do usuário');
    }

    const deletionResult = await repository.delete(createdUser.id);
    expect(deletionResult).toBe(true);

    const users = await repository.select();
    const found = users.find(u => u.id === createdUser.id);
    expect(found).toBeUndefined();
  });
});
