import { db } from './index.js';
import { users } from './schema/user.js';
import bcrypt from 'bcrypt';
import { createId } from '@paralleldrive/cuid2';
import { env } from '../../shared/env.js';
import { eq } from 'drizzle-orm';

async function seedUsers() {
  const adminUsers = [
    {
      email: env.ADMIN1_EMAIL,
      password: env.ADMIN1_PASSWORD,
      role: 'admin',
    },
    {
      email: env.ADMIN2_EMAIL,
      password: env.ADMIN2_PASSWORD,
      role: 'admin',
    },
    {
      email: env.ADMIN3_EMAIL,
      password: env.ADMIN3_PASSWORD,
      role: 'admin',
    },
  ];

  for (const user of adminUsers) {
    if (!user.email || !user.password) continue;

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, user.email))
      .limit(1);

    if (existingUser) {
      console.log(`Usuário ${user.email} já existe. Pulando...`);
      continue;
    }

    const passwordHash = await bcrypt.hash(user.password, 10);

    await db.insert(users).values({
      id: createId(),
      email: user.email,
      passwordHash,
      role: user.role,
    });

    console.log(`Usuário ${user.email} criado com sucesso!`);
  }
}

export async function runSeed() {
  await seedUsers();
}
