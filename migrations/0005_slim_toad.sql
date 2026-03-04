CREATE TABLE "model" (
	"id" integer PRIMARY KEY NOT NULL,
	"position_id" integer NOT NULL,
	"player_number" integer NOT NULL,
	"ma" integer NOT NULL,
	"st" integer NOT NULL,
	"ag" integer NOT NULL,
	"pa" integer NOT NULL,
	"av" integer NOT NULL,
	"cost" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "model" ADD CONSTRAINT "model_position_id_position_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."position"("id") ON DELETE cascade ON UPDATE no action;