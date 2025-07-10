CREATE TABLE "clients" (
	"id" text PRIMARY KEY NOT NULL,
	"enterprise" text,
	"cnpj" text,
	"competence_month" text,
	"product" text,
	"contestation" text,
	"returned" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
