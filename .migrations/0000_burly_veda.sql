CREATE TYPE "public"."pending_category" AS ENUM('SAC', 'Atendimento', 'Financeiro', 'Diretoria', 'Comercial', 'Auditoria');--> statement-breakpoint
CREATE TYPE "public"."pending_status" AS ENUM('Aberto', 'Encaminhado', 'Pendente', 'Concluído');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('Ativos', 'Finalizados', 'Em Andamento', 'Em migração');--> statement-breakpoint
CREATE TABLE "contract_table" (
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
CREATE TABLE "excel_data_negotiations" (
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
CREATE TABLE "partners" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"cpf_or_cnpj" text NOT NULL,
	"city" text,
	"state" text,
	"commission" real,
	"portal" text,
	"channel_head" text,
	"regional" text,
	"coordinator" text,
	"agent" text,
	"indicator" text,
	"contract" text,
	"phone" text,
	"email" text,
	"responsible" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pending_table" (
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
CREATE TABLE "portal_controll" (
	"id" text PRIMARY KEY NOT NULL,
	"enterprise" text,
	"product" text,
	"percentage_honorary" real,
	"compensation" real,
	"honorary" real,
	"tax" real,
	"value" real,
	"situation" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_table" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
