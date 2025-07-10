// src/core/use-cases/authenticate-user.ts
import bcrypt from 'bcrypt';
import type { UserRepository } from '@/core/repositories/user-repository.js';
import { generateToken } from '@/infra/auth/jose.js';

interface AuthenticateUserInput {
  email: string;
  password: string;
}

interface AuthenticateUserOutput {
  token: string;
}

export class AuthenticateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserInput): Promise<AuthenticateUserOutput | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) return null;

    const token = await generateToken({ id: user.id, role: user.role });

    return { token };
  }
}
