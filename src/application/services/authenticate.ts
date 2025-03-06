// src/application/services/AuthenticationService.ts
import bcrypt from 'bcrypt';
import type { UserRepository } from '../../domain/repositories/User';
import { generateToken } from '../../config/jose';

export class AuthenticationService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return null;
    }

    const token = await generateToken({ id: user.id, role: user.role });
    return token;
  }
}
