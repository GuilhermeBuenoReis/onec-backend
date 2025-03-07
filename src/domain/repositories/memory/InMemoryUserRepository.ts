import type { UserRepository } from '../../repositories/User';
import { User } from '../../entities/User';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(userData: Omit<User, 'id'>): Promise<User | null> {
    const user = new User(
      undefined,
      userData.email,
      userData.passwordHash,
      userData.role
    );
    this.users.push(user);
    return user;
  }

  async select(): Promise<User[]> {
    return this.users;
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    const updatedUser = { ...this.users[index], ...data };
    this.users[index] = updatedUser;
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async addUser(user: User): Promise<void> {
    this.users.push(user);
  }
}
