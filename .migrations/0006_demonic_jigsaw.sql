ALTER TABLE "contract_table" ADD COLUMN "status_id" text;--> statement-breakpoint
ALTER TABLE "contract_table" ADD CONSTRAINT "contract_table_status_id_status_table_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."status_table"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contract_table" DROP COLUMN "status";