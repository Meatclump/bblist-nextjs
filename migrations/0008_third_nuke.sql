CREATE TABLE "team_models" (
	"id" integer PRIMARY KEY NOT NULL,
	"team_id" integer NOT NULL,
	"model_id" integer NOT NULL,
	"min_models" integer NOT NULL,
	"max_models" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "team_models" ADD CONSTRAINT "team_models_team_id_team_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_models" ADD CONSTRAINT "team_models_model_id_model_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."model"("id") ON DELETE cascade ON UPDATE no action;