import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgSchema,
  real,
  serial,
  pgTable as table,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "./columns/helpers";

export const neonAuth = pgSchema("neon_auth");
export const discountType = pgEnum("discount_type", ["fixed", "percentage"]);

export const users = neonAuth.table(
  "users_sync",
  {
    rawJson: jsonb("raw_json").notNull(),
    id: text()
      .primaryKey()
      .notNull()
      .generatedAlwaysAs(sql`(raw_json ->> 'id'::text)`),
    name: text().generatedAlwaysAs(sql`(raw_json ->> 'display_name'::text)`),
    email: text().generatedAlwaysAs(sql`(raw_json ->> 'primary_email'::text)`),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).generatedAlwaysAs(
      sql`to_timestamp((trunc((((raw_json ->> 'signed_up_at_millis'::text))::bigint)::double precision) / (1000)::double precision))`
    ),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
    deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
  },
  (table) => [
    index("users_sync_deleted_at_idx").using(
      "btree",
      table.deletedAt.asc().nullsLast().op("timestamptz_ops")
    ),
  ]
);

export const products = table("products", {
  id: serial().primaryKey(),
  categoryId: uuid("category_id")
    .references(() => categories.id)
    .notNull(),
  title: varchar({ length: 255 }).notNull().unique(),
  slug: varchar().notNull().unique(),
  price: real().notNull(),
  discount: real(),
  discountType: discountType(),
  rating: real(),
  thumbnail: varchar(),
  gallery: varchar().array(),
  colors: varchar().array(),
  sizes: varchar().array(),
  description: varchar().notNull(),
  stock: integer().notNull(),
  isCartItem: boolean("is_cart_item").default(false),
  isFavoriteItem: boolean("is_favorite_item").default(false),
  ...timestamps,
});

export const categories = table("categories", {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull().unique(),
  slug: varchar().notNull().unique(),
  thumbnail: varchar(),
  ...timestamps,
});

export const offers = table("offers", {
  id: serial().primaryKey(),
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
  id: serial().primaryKey(),
  userId: text("user_id").notNull(),
  products: jsonb("products").$type<(typeof products.$inferSelect)[]>(),
  ...timestamps,
});

export const favorites = table("favorites", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  products: jsonb("products").$type<(typeof products.$inferSelect)[]>(),
  ...timestamps,
});

export const addressBooking = table("address_booking", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  phone: varchar().notNull(),
  address: varchar().notNull(),
  city: varchar().notNull(),
  userId: text("user_id").notNull().unique(),
  phone2: varchar(),
  ...timestamps,
});

export const cloudinaryFiles = table("cloudinary_files", {
  id: serial().primaryKey(),
  publicId: text("public_id").notNull().unique(),
  mediaUrl: text("media_url").notNull(),
  resourceType: text("resource_type").notNull(),
  userId: text("user_id").notNull(),
  uploadTimestamp: timestamp("upload_timestamp", {
    withTimezone: true,
  }).defaultNow(),
});
