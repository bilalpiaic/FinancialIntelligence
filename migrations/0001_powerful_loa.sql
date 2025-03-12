ALTER TABLE "accounts" ADD COLUMN "category" text NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "parent_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "level" numeric DEFAULT '1' NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_parent_id_accounts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;