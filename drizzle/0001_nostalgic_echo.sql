CREATE TABLE "connected_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"platform" text NOT NULL,
	"platform_user_id" text NOT NULL,
	"username" text NOT NULL,
	"access_token" text NOT NULL,
	"refresh_token" text,
	"token_expires_at" timestamp with time zone,
	"scopes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "roast_results" ADD PRIMARY KEY ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "connected_accounts_user_platform_idx" ON "connected_accounts" USING btree ("user_id","platform");--> statement-breakpoint
CREATE UNIQUE INDEX "connected_accounts_platform_user_idx" ON "connected_accounts" USING btree ("platform","platform_user_id");