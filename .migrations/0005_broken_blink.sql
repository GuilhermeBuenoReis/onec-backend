CREATE TABLE "contract_table" (
	"city" text,
	"clients" text NOT NULL,
	"state" text,
	"cnpj" text,
	"sindic" text,
	"year" text,
	"matter" text,
	"forecast" text,
	"contract_total" text,
	"percentage" real,
	"signed_contract" text,
	"status" text,
	"average_guide" real,
	"partner" text,
	"partner_commission" real,
	"counter" text,
	"email" text
);
--> statement-breakpoint
ALTER TABLE "excel_data_negotiations" ADD COLUMN "starts_date" text;--> statement-breakpoint
ALTER TABLE "excel_data_negotiations" DROP COLUMN "startsDate";