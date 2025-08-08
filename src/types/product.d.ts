import { products } from "@/db/schema";

export interface Product {
  select: typeof products.$inferSelect;
  insert: typeof products.$inferInsert;
}
