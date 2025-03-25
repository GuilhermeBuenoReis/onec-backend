import { describe, it, expect } from 'vitest';
import { InMemoryUserRepository } from '../../domain/repositories/memory/InMemoryUserRepository';

describe('Find user by email', () => {
  it('should select an existing user by email', async () => {
    const repository = new InMemoryUserRepository();

    const user = {
      id: '1',
      email: 'user@example.com',
      passwordHash: 'hashedpassword123',
      role: 'admin',
    };

    const createdUser = await repository.create(user);

    if (!createdUser) {
      throw new Error('Falha na criação do usuário');
    }

    const findUserByEmail = await repository.findByEmail(user.email);

    expect(findUserByEmail).toEqual(
      expect.objectContaining({
        email: user.email,
        passwordHash: user.passwordHash,
        role: user.role,
      })
    );
  });
});
