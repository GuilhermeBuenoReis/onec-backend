CREATE TABLE "client_table" (
	"id" text PRIMARY KEY NOT NULL,
	"enterprise" text,
	"cnpj" text,
	"product" text,
	"competence_month" text,
	"contestation" text,
	"return" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "credentials_table" (
	"id" text PRIMARY KEY NOT NULL,
	"channel_head" text,
	"partner" text,
	"cnpj" text,
	"agent_indicator" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
