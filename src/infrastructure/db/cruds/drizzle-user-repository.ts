import { eq } from 'drizzle-orm';
import { db } from '..';
import { authenticateUser } from '../../../config/jose';
import { User } from '../../../domain/entities/User';
import type { UserRepository } from '../../../domain/repositories/User';
import { users } from '../schema';

export class DrizzleUserRepository implements UserRepository {
  async create(userData: Omit<User, 'id'>): Promise<User | null> {
    const user = new User(
      undefined,
      userData.email,
      userData.passwordHash,
      userData.role
    );

    const response = await db
      .insert(users)
      .values({
        id: user.id,
        email: user.email,
        passwordHash: user.passwordHash,
        role: user.role,
      })
      .returning();

    const createdUser = response[0];

    if (!createdUser) {
      throw new Error('Erro ao criar usuário!');
    }

    return createdUser;
  }

  async select(): Promise<User[]> {
    const response = await db
      .select({
        id: users.id,
        email: users.email,
        passwordHash: users.passwordHash,
        role: users.role,
      })
      .from(users);

    return response.map(
      row => new User(row.id, row.email, row.passwordHash, row.role)
    );
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const response = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    return response[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const response = await db.delete(users).where(eq(users.id, id)).returning();

    return response.length > 0;
  }

  async findByEmail(email: string): Promise<User | null> {
    const response = await db
      .select({
        id: users.id,
        email: users.email,
        passwordHash: users.passwordHash,
        role: users.role,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    const foundUser = response[0];

    if (!foundUser) {
      return null;
    }

    return new User(
      foundUser.id,
      foundUser.email,
      foundUser.passwordHash,
      foundUser.role
    );
  }

  async authenticateUserByEmailAndPassword(email: string, password: string) {
    const findUserAlredyExistInDataBase = await this.findByEmail(email);

    if (
      findUserAlredyExistInDataBase === null ||
      findUserAlredyExistInDataBase === undefined
    ) {
      return {
        message: 'Erro ao encontrar o usuário, garanta que ele exista!',
      };
    }
    const userId = findUserAlredyExistInDataBase.id;

    const token = await authenticateUser(userId);

    return { token };
  }
}
