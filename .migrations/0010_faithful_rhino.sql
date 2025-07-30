CREATE TABLE "negotiation_staging" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"client" text,
	"user" text,
	"tags" text,
	"step" text,
	"status" text,
	"value" real,
	"starts_date" text,
	"observation" text,
	"partner_id" text,
	"average_guide" real,
	"import_status" text DEFAULT 'pendente',
	"error_message" text,
	"imported_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contracts" ADD COLUMN "reference_id" text;--> statement-breakpoint
ALTER TABLE "negotiation_imports" ADD COLUMN "reference_id" text;