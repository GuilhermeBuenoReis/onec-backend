import { createId } from '@paralleldrive/cuid2';
import { pgEnum } from 'drizzle-orm/pg-core';
import { pgTable, text, integer, real, timestamp } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', [
  'Ativos',
  'Finalizados',
  'Em Andamento',
  'Em migração',
]);

export const partnerTable = pgTable('partners', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name'),
  cpfOrCnpj: text('cpf_or_cnpj'),
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
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const excelDataNegotiationTable = pgTable('excel_data_negotiations', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title'),
  client: text('client'),
  user: text('user'),
  tags: text('tags'),
  step: text('step'),
  status: text('status'),
  value: real('value'),
  startsDate: text('starts_date'),
  observation: text('observation'),
  partnerId: text('partner_id'),
  averageGuide: real('average_guide'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const contractTable = pgTable('contract_table', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  city: text('city'),
  client: text('clients'),
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
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const userTable = pgTable('users_table', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const pendingStatusEnum = pgEnum('pending_status', [
  'Aberto',
  'Encaminhado',
  'Pendente',
  'Concluído',
]);

export const pendingCategoryEnum = pgEnum('pending_category', [
  'SAC',
  'Atendimento',
  'Financeiro',
  'Diretoria',
  'Comercial',
  'Auditoria',
]);

export const pendingTable = pgTable('pending_table', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  client: text('client'),
  callReason: text('call_reason'),
  status: pendingStatusEnum(),
  priority: text('priority'),
  responsible: text('Responsible'),
  category: pendingCategoryEnum(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const portalControllTable = pgTable('portal_controll', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),

  monthOfCalculation: text('month_of_calculation'),
  competenceMonth: text('competence_month'),
  contract: real('contract'),
  enterprise: text('enterprise'),
  product: text('product'),
  percentageHonorary: real('percentage_honorary'),
  compensation: real('compensation'),
  honorary: real('honorary'),
  tax: real('tax'),
  value: real('value'),
  situation: text('situation'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const credentialsTable = pgTable('credentials_table', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  channelHead: text('channel_head'),
  partner: text('partner'),
  cnpj: text('cnpj'),
  agentIndicator: text('agent_indicator'),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const clientTable = pgTable('client_table', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  enterprise: text('enterprise'),
  cnpj: text('cnpj'),
  product: text('product'),
  competenceMonth: text('competence_month'),
  contestation: text('contestation'),
  returned: text('return'),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
