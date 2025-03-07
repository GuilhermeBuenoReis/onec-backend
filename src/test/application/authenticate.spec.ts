import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthenticationService } from '../../application/services/authenticate';
import { InMemoryUserRepository } from '../../domain/repositories/memory/InMemoryUserRepository';
import { User } from '../../domain/entities/User';

vi.mock('bcrypt', () => {
  return {
    default: {
      compare: async (plaintext: string, hash: string) => {
        return plaintext === hash;
      },
    },
  };
});

vi.mock('../../config/jose', () => {
  return {
    generateToken: async ({ id, role }: { id: string; role: string }) => {
      return `token-${id}-${role}`;
    },
  };
});

describe('AuthenticationService - login', () => {
  let userRepository: InMemoryUserRepository;
  let authService: AuthenticationService;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    authService = new AuthenticationService(userRepository);
  });

  it('should return a token if credentials are valid', async () => {
    const user = new User('1', 'user@example.com', 'password', 'admin');
    await userRepository.addUser(user);

    const token = await authService.login('user@example.com', 'password');
    expect(token).toBe('token-1-admin');
  });

  it('should return null if email is not found', async () => {
    const token = await authService.login(
      'nonexistent@example.com',
      'password'
    );
    expect(token).toBeNull();
  });

  it('should return null if password is invalid', async () => {
    const user = new User('2', 'user2@example.com', 'correctpassword', 'user');
    await userRepository.addUser(user);

    const token = await authService.login('user2@example.com', 'wrongpassword');
    expect(token).toBeNull();
  });
});
