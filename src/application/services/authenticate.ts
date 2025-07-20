import bcrypt from 'bcrypt';
import { authenticateUser } from '../../config/jose';
import type { UserRepository } from '../../domain/repositories/User';

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

    const userId = user.id;

    const token = await authenticateUser(userId);
    return token;
  }
}
