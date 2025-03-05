import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, integer, real, timestamp } from 'drizzle-orm/pg-core';

export const partnerTable = pgTable('partners', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  cpfOrCnpj: text('cpf_or_cnpj').notNull(),
  city: text('city'),
  state: text('state'),
  commission: real('commission'),
  portal: text('portal'),
  channelHead: text('channel_head'),
  regional: text('regional'),
  coordinator: text('coordinator'),
  agent: text('agent'),
  indicator: text('indicator'),
  contract: text('contract'),
  phone: text('phone'),
  email: text('email'),
  responsible: text('responsible'),
});

export const excelDataNegotiationTable = pgTable('excel_data_negotiations', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  client: text('client').notNull(),
  user: text('user').notNull(),
  tags: text('tags').notNull(),
  step: text('step').notNull(),
  status: text('status').notNull(),
  value: real('value').notNull(),
  startsDate: text('starts_date'),
  observation: text('observation'),
  partnerId: text('partner_id').references(() => partnerTable.id),
  averageGuide: real('average_guide'),
});

export const contractTable = pgTable('contract_table', {
  city: text('city'),
  client: text('clients').notNull(),
  state: text('state'),
  cnpj: text('cnpj'),
  sindic: text('sindic'),
  year: text('year'),
  matter: text('matter'),
  forecast: text('forecast'),
  contractTotal: text('contract_total'),
  percentage: real('percentage'),
  signedContract: text('signed_contract'),
  status: text('status'),
  averageGuide: real('average_guide'),
  partner: text('partner'),
  partnerCommission: real('partner_commission'),
  counter: text('counter'),
  email: text('email'),
});
