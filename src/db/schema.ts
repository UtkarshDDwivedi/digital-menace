import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const roastResults = pgTable("roast_results", {
    id: uuid("id").defaultRandom().notNull(),
    userId: text("user_id").notNull(),
    platform: text("platform").notNull(),
    roast: text("roast").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
})