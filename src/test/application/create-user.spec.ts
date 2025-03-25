import { describe, it, expect } from 'vitest';
import { InMemoryUserRepository } from '../../domain/repositories/memory/InMemoryUserRepository';

describe('Create User', () => {
  it('should create a new user with valid data', async () => {
    const userData = {
      email: 'user@example.com',
      passwordHash: 'hashedpassword123',
      role: 'admin',
    };

    const repository = new InMemoryUserRepository();
    const createdUser = await repository.create(userData);

    if (!createdUser) {
      throw new Error('Usuário não foi criado');
    }

    expect(createdUser).toMatchObject(userData);
    expect(createdUser.id).toBeDefined();
  });

  it('should throw an error when user creation fails', async () => {
    const repository = new InMemoryUserRepository();

    repository.create = async () => {
      throw new Error('Erro ao criar usuário!');
    };

    await expect(
      repository.create({
        email: 'fail@example.com',
        passwordHash: 'failpassword',
        role: 'user',
      })
    ).rejects.toThrow('Erro ao criar usuário!');
  });
});
