CREATE TABLE "status_table" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text,
	"count" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "portal_controll" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "portal_controll" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;