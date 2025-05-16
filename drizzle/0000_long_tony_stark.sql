CREATE SCHEMA "my_schema";
--> statement-breakpoint
CREATE TABLE "my_schema"."todo" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"isCompleted" boolean NOT NULL
);
