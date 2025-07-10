import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const clients = pgTable('clients', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  enterprise: text('enterprise'),
  cnpj: text('cnpj'),
  competenceMonth: text('competence_month'),
  product: text('product'),
  contestation: text('contestation'),
  returned: text('returned'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
