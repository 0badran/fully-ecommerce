"use server";

import { db } from "@/db/connection";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCategories() {
  try {
    return await db.select().from(categories);
  } catch {
    return null;
  }
}

export async function getCategory(slug: string) {
  try {
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1);
    return category;
  } catch {
    return null;
  }
}

export async function deleteCategory(slug: string) {
  try {
    return await db
      .delete(categories)
      .where(eq(categories.slug, slug))
      .returning();
  } catch {
    return null;
  }
}
