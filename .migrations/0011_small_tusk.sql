CREATE TABLE "contestation" (
	"id" text PRIMARY KEY NOT NULL,
	"product" text,
	"competence" text,
	"cnpj" text,
	"client" text,
	"percentage" real,
	"compensation" real,
	"honorary" real,
	"tax" real,
	"value_tj" real,
	"to_pay" real,
	"status" text,
	"observation" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
