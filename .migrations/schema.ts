import { pgTable, text, real, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const excelDataNegotiations = pgTable("excel_data_negotiations", {
	id: text().primaryKey().notNull(),
	title: text().notNull(),
	client: text().notNull(),
	user: text().notNull(),
	tags: text().notNull(),
	step: text().notNull(),
	status: text().notNull(),
	value: real().notNull(),
	observation: text(),
	partnerId: text("partner_id"),
	averageGuide: real("average_guide"),
});

export const partners = pgTable("partners", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	cpfOrCnpj: integer("cpf_or_cnpj").notNull(),
	city: text(),
	state: text(),
	commission: real(),
	portal: text(),
	channelHead: text("channel_head"),
	regional: text(),
	coordinator: text(),
	agent: text(),
	indicator: text(),
	contract: text(),
	phone: integer(),
	email: text(),
	responsible: text(),
});
