CREATE TABLE "roster_model" (
	"id" integer PRIMARY KEY NOT NULL,
	"roster_id" integer NOT NULL,
	"model_id" integer NOT NULL,
	"player_number" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "roster_model" ADD CONSTRAINT "roster_model_roster_id_roster_id_fk" FOREIGN KEY ("roster_id") REFERENCES "public"."roster"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roster_model" ADD CONSTRAINT "roster_model_model_id_model_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."model"("id") ON DELETE cascade ON UPDATE no action;