import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import type { FastifyInstance } from 'fastify';
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

    const [created] = await db
      .insert(users)
      .values({
        id: user.id,
        email: user.email,
        passwordHash: user.passwordHash,
        role: user.role,
      })
      .returning();

    return created
      ? new User(created.id, created.email, created.passwordHash, created.role)
      : null;
  }

  async select(): Promise<User[]> {
    const rows = await db.select().from(users);
    return rows.map(
      row => new User(row.id, row.email, row.passwordHash, row.role)
    );
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const [updated] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    return updated
      ? new User(updated.id, updated.email, updated.passwordHash, updated.role)
      : null;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await db.delete(users).where(eq(users.id, id)).returning();
    return deleted.length > 0;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user
      ? new User(user.id, user.email, user.passwordHash, user.role)
      : null;
  }

  async findById(id: string): Promise<User | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return user
      ? new User(user.id, user.email, user.passwordHash, user.role)
      : null;
  }

  async authenticateUserByEmailAndPassword(
    app: FastifyInstance,
    email: string,
    password: string
  ): Promise<{ token: string } | { message: string }> {
    const [foundUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!foundUser) {
      return { message: 'Usuário não encontrado!' };
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      foundUser.passwordHash
    );

    if (!isPasswordValid) {
      return { message: 'Senha inválida!' };
    }

    const token = app.jwt.sign(
      {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      },
      { expiresIn: '7d' }
    );

    return { token };
  }
}
