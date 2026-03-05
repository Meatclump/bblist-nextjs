ALTER TABLE "team_models" DROP CONSTRAINT "team_models_position_id_model_id_fk";
--> statement-breakpoint
ALTER TABLE "team_models" ADD COLUMN "model_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "team_models" ADD CONSTRAINT "team_models_position_id_position_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."position"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_models" ADD CONSTRAINT "team_models_model_id_model_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."model"("id") ON DELETE cascade ON UPDATE no action;