import { categories } from "@/db/schema";

type Category = {
  select: typeof categories.$inferSelect;
  insert: typeof categories.$inferInsert;
};
