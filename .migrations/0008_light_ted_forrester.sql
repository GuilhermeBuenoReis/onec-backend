CREATE TABLE "client_receipt" (
	"id" text PRIMARY KEY NOT NULL,
	"receipt_date" timestamp with time zone,
	"competence" text,
	"cnpj" text,
	"client_name" text,
	"percentage" real,
	"compensation_month" text,
	"honorary" real,
	"tax" real,
	"status" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
