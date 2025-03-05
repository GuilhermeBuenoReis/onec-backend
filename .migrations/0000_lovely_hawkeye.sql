CREATE TABLE "excel_data_negotiations" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"client" text NOT NULL,
	"user" text NOT NULL,
	"tags" text NOT NULL,
	"step" text NOT NULL,
	"status" text NOT NULL,
	"value" real NOT NULL,
	"observation" text,
	"partner_id" text,
	"average_guide" real
);
--> statement-breakpoint
CREATE TABLE "partners" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"cpf_or_cnpj" integer NOT NULL,
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
	"phone" integer,
	"email" text,
	"responsible" text
);
