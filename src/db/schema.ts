import {
  pgTable,
  text,
  timestamp,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const roastResults = pgTable("roast_results", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  platform: text("platform").notNull(),
  roast: text("roast").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const connectedAccounts = pgTable(
  "connected_accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    platform: text("platform").notNull(),
    platformUserId: text("platform_user_id").notNull(),
    username: text("username").notNull(),
    accessToken: text("access_token").notNull(),
    refreshToken: text("refresh_token"),
    tokenExpiresAt: timestamp("token_expires_at", {
      withTimezone: true,
    }),
    scopes: text("scopes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    // One connection per platform for each Digital Menace user
    uniqueIndex("connected_accounts_user_platform_idx").on(
      table.userId,
      table.platform,
    ),

    // Prevent the same external account from being linked twice
    uniqueIndex("connected_accounts_platform_user_idx").on(
      table.platform,
      table.platformUserId,
    ),
  ],
);
