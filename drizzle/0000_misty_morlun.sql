CREATE TABLE "roast_results" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"platform" text NOT NULL,
	"roast" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
