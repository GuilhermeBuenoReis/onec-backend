import { describe, it, expect } from 'vitest';
import { InMemoryUserRepository } from '../../domain/repositories/memory/InMemoryUserRepository';

describe('Update User', () => {
  it('should update an existing user', async () => {
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

    const updateData = {
      email: 'updated@example.com',
      role: 'user',
    };

    const updatedUser = await repository.update(createdUser.id, updateData);

    expect(updatedUser).toBeDefined();
    expect(updatedUser?.email).toBe(updateData.email);
    expect(updatedUser?.role).toBe(updateData.role);
    expect(updatedUser?.passwordHash).toBe(userData.passwordHash);
  });
});
