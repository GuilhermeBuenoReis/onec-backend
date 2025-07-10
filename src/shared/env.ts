import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .optional()
    .default('production'),

  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  ADMIN1_EMAIL: z.string(),
  ADMIN1_PASSWORD: z.string(),
  ADMIN2_EMAIL: z.string(),
  ADMIN2_PASSWORD: z.string(),
  ADMIN3_EMAIL: z.string(),
  ADMIN3_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
