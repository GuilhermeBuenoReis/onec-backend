import { db } from '../index.js'
import { users } from '../schema/user.js'
import bcrypt from 'bcrypt'
import { createId } from '@paralleldrive/cuid2'
import { env } from '@/shared/env.js'
import chalk from 'chalk'
import { appendFile } from 'node:fs/promises'

async function logToFile(content: string) {
  const logLine = `[${new Date().toISOString()}] ${content}\n`
  await appendFile('seed-installation.log', logLine)
}

export async function seedAdmins() {
  const adminUsers = [
    { email: env.ADMIN1_EMAIL, password: env.ADMIN1_PASSWORD },
    { email: env.ADMIN2_EMAIL, password: env.ADMIN2_PASSWORD },
    { email: env.ADMIN3_EMAIL, password: env.ADMIN3_PASSWORD },
  ]

  for (const admin of adminUsers) {
    const existing = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, admin.email),
    })

    if (existing) {
      const msg = `Usuário ${admin.email} já existe. Pulando...`
      console.log(chalk.yellow(msg))
      await logToFile(msg)
      continue
    }

    const passwordHash = await bcrypt.hash(admin.password, 10)
    await db.insert(users).values({
      id: createId(),
      email: admin.email,
      passwordHash,
      role: 'admin',
    }).execute()

    const msg = `Usuário ${admin.email} criado com sucesso!`
    console.log(chalk.green(msg))
    await logToFile(msg)
  }
}
