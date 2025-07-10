import { db } from '../index.js'
import { users } from '@/infra/db/schema/user.js'
import { eq } from 'drizzle-orm'
import { User } from '@/core/entities/user.js'
import type { UserRepository } from '@/core/repositories/user-repository.js'

export class DrizzleUserRepository implements UserRepository {
  async create(userData: Omit<User, 'id'>): Promise<User | null> {
    const user = new User(undefined, userData.email, userData.passwordHash, userData.role);
    const [createdUser] = await db.insert(users).values(user).returning();

    if (!createdUser) throw new Error('Erro ao criar usuário');
    return new User(createdUser.id, createdUser.email, createdUser.passwordHash, createdUser.role);
  }

  async select(): Promise<User[]> {
    const response = await db.select().from(users);
    return response.map(u => new User(u.id, u.email, u.passwordHash, u.role));
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const [updatedUser] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return updatedUser ?? null;
  }

  async delete(id: string): Promise<boolean> {
    const res = await db.delete(users).where(eq(users.id, id)).returning();
    return res.length > 0;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!user) return null;
    return new User(user.id, user.email, user.passwordHash, user.role);
  }
}
