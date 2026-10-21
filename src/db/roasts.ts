import { desc, eq } from "drizzle-orm";
import { db } from "@/db/";
import { roastResults } from "@/db/schema";

export async function saveRoast(
  userId: string,
  platform: string,
  roast: string,
) {
  const [result] = await db
    .insert(roastResults)
    .values({
      userId,
      platform,
      roast,
    })
    .returning();

  return result;
}

export async function getRoastsForUser(userId: string) {
  return db
    .select()
    .from(roastResults)
    .where(eq(roastResults.userId, userId))
    .orderBy(desc(roastResults.createdAt));
}
