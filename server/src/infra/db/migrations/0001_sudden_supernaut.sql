ALTER TABLE "links" RENAME COLUMN "shortened_key" TO "shortened_url";--> statement-breakpoint
ALTER TABLE "links" DROP CONSTRAINT "links_shortened_key_unique";--> statement-breakpoint
ALTER TABLE "links" ALTER COLUMN "visit_count" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_shortened_url_unique" UNIQUE("shortened_url");