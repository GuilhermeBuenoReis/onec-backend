import { pgTable, text, real, timestamp } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const clientReceipt = pgTable('client_receipt', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  receiptDate: text('receipt_date'),
  competence: text('competence'),
  cnpj: text('cnpj'),
  clientName: text('client_name'),
  percentage: real('percentage'),
  compensationMonth: text('compensation_month'),
  honorary: real('honorary'),
  tax: real('tax'),
  status: text('status'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
