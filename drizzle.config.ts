import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import { env } from './src/shared/env'
import {} from './src/infra/db/schema/index'

export default defineConfig({
  schema: './src/infra/db/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL
  },
})
