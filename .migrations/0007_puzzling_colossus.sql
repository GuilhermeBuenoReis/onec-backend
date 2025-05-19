CREATE TABLE "clients" (
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
CREATE TABLE "contracts" (
	"id" text PRIMARY KEY NOT NULL,
	"city" text,
	"clients" text,
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
	"email" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "credentials" (
	"id" text PRIMARY KEY NOT NULL,
	"channel_head" text,
	"partner" text,
	"cnpj" text,
	"agent_indicator" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "negotiation_imports" (
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
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pending_issues" (
	"id" text PRIMARY KEY NOT NULL,
	"client" text,
	"call_reason" text,
	"status" "pending_status",
	"priority" text,
	"Responsible" text,
	"category" "pending_category",
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portal_controls" (
	"id" text PRIMARY KEY NOT NULL,
	"month_of_calculation" text,
	"competence_month" text,
	"contract" real,
	"enterprise" text,
	"product" text,
	"percentage_honorary" real,
	"compensation" real,
	"honorary" real,
	"tax" real,
	"tj" real,
	"value" real,
	"situation" text,
	"partner_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DROP TABLE "client_table" CASCADE;--> statement-breakpoint
DROP TABLE "contract_table" CASCADE;--> statement-breakpoint
DROP TABLE "credentials_table" CASCADE;--> statement-breakpoint
DROP TABLE "excel_data_negotiations" CASCADE;--> statement-breakpoint
DROP TABLE "pending_table" CASCADE;--> statement-breakpoint
DROP TABLE "portal_controll" CASCADE;--> statement-breakpoint
DROP TABLE "users_table" CASCADE;--> statement-breakpoint
ALTER TABLE "portal_controls" ADD CONSTRAINT "portal_controls_partner_id_partners_id_fk" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE no action ON UPDATE no action;