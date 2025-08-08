"use server";

import { db } from "@/db/connection";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getProducts() {
  try {
    return await db.select().from(products);
  } catch {
    return null;
  }
}

export async function getProduct(slug: string) {
  try {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);
    return product;
  } catch {
    return null;
  }
}

export async function deleteProduct(id: number) {
  try {
    return await db.delete(products).where(eq(products.id, id)).returning();
  } catch {
    return null;
  }
}
