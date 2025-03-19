import { db } from '.';
import { userTable } from './schema';
import bcrypt from 'bcrypt';
import { createId } from '@paralleldrive/cuid2';
import { env } from '../../env';

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
    const passwordHash = await bcrypt.hash(user.password, 10);
    await db
      .insert(userTable)
      .values({
        id: createId(),
        email: user.email,
        passwordHash,
        role: user.role,
      })
      .execute();
  }
  console.log('Administradores seed criados!');
}

seedUsers().catch(console.error);
