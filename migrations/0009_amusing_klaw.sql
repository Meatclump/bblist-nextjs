ALTER TABLE "team_models" RENAME COLUMN "model_id" TO "position_id";--> statement-breakpoint
ALTER TABLE "team_models" DROP CONSTRAINT "team_models_model_id_model_id_fk";
--> statement-breakpoint
ALTER TABLE "team_models" ADD CONSTRAINT "team_models_position_id_model_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."model"("id") ON DELETE cascade ON UPDATE no action;