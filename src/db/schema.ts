import {
  boolean,
  date,
  integer,
  jsonb,
  pgEnum,
  real,
  smallint,
  varchar,
  pgTable as table,
} from "drizzle-orm/pg-core";
import { timestamps } from "./columns/helpers";

export const rolesEnum = pgEnum("role", ["user", "admin"]);

export const discountType = pgEnum("discount_type", ["fixed", "percentage"]);

export const users = table("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  hash: varchar().notNull(),
  phone: varchar({ length: 20 }).unique(),
  birthdate: date().notNull(),
  country: varchar({ length: 255 }).notNull(),
  role: rolesEnum().default("user"),
  ...timestamps,
});

export const products = table("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(),
  title: varchar({ length: 255 }).notNull().unique(),
  slug: varchar().notNull().unique(),
  price: smallint(),
  discount: real(),
  discountType: discountType(),
  rating: real(),
  thumbnail: varchar().notNull(),
  gallery: varchar().array(),
  colors: varchar().array(),
  sizes: varchar().array(),
  description: varchar(),
  stock: integer(),
  isCartItem: boolean("is_cart_item").default(false),
  isFavoriteItem: boolean("is_favorite_item").default(false),
  ...timestamps,
});

export const categories = table("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull().unique(),
  slug: varchar().notNull().unique(),
  thumbnail: varchar(),
  ...timestamps,
});

export const offers = table("offers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull().unique(),
  slug: varchar().notNull().unique(),
  discount: real(),
  discountType: discountType(),
  products: jsonb().$type<(typeof products.$inferSelect)[]>(),
  startDate: date("start_date"),
  endDate: date("end_date"),
  ...timestamps,
});

export const carts = table("carts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  products: jsonb("products").$type<(typeof products.$inferSelect)[]>(),
  ...timestamps,
});

export const favorites = table("favorites", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  products: jsonb("products").$type<(typeof products.$inferSelect)[]>(),
  ...timestamps,
});
