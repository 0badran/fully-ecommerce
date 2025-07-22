import { pgTable, unique, integer, varchar, timestamp, text, jsonb, serial, real, date, foreignKey, smallint, boolean, pgSchema, index, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const neonAuth = pgSchema("neon_auth");
export const discountType = pgEnum("discount_type", ['fixed', 'percentage'])


export const addressBooking = pgTable("address_booking", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "address_booking_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	address: varchar().notNull(),
	city: varchar().notNull(),
	phone2: varchar(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	userId: text("user_id").notNull(),
	name: varchar().notNull(),
	email: varchar().notNull(),
	phone: varchar().notNull(),
}, (table) => [
	unique("address_booking_user_id_unique").on(table.userId),
]);

export const carts = pgTable("carts", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "carts_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	userId: text("user_id").notNull(),
	products: jsonb(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
});

export const cloudinaryFiles = pgTable("cloudinary_files", {
	id: serial().primaryKey().notNull(),
	publicId: text("public_id").notNull(),
	mediaUrl: text("media_url").notNull(),
	resourceType: text("resource_type").notNull(),
	userId: text("user_id").notNull(),
	uploadTimestamp: timestamp("upload_timestamp", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	unique("cloudinary_files_public_id_unique").on(table.publicId),
]);

export const favorites = pgTable("favorites", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "favorites_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	userId: text("user_id").notNull(),
	products: jsonb(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
});

export const offers = pgTable("offers", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "offers_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	title: varchar({ length: 255 }).notNull(),
	slug: varchar().notNull(),
	discount: real(),
	discountType: discountType(),
	products: jsonb(),
	startDate: date("start_date"),
	endDate: date("end_date"),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	unique("offers_title_unique").on(table.title),
	unique("offers_slug_unique").on(table.slug),
]);

export const categories = pgTable("categories", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "categories_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	title: varchar({ length: 255 }).notNull(),
	slug: varchar().notNull(),
	thumbnail: varchar(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	unique("categories_title_unique").on(table.title),
	unique("categories_slug_unique").on(table.slug),
]);

export const products = pgTable("products", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "products_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	categoryId: integer("category_id").notNull(),
	title: varchar({ length: 255 }).notNull(),
	slug: varchar().notNull(),
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
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "products_category_id_categories_id_fk"
		}),
	unique("products_title_unique").on(table.title),
	unique("products_slug_unique").on(table.slug),
]);

export const usersSyncInNeonAuth = neonAuth.table("users_sync", {
	rawJson: jsonb("raw_json").notNull(),
	id: text().primaryKey().notNull().generatedAlwaysAs(sql`(raw_json ->> 'id'::text)`),
	name: text().generatedAlwaysAs(sql`(raw_json ->> 'display_name'::text)`),
	email: text().generatedAlwaysAs(sql`(raw_json ->> 'primary_email'::text)`),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).generatedAlwaysAs(sql`to_timestamp((trunc((((raw_json ->> 'signed_up_at_millis'::text))::bigint)::double precision) / (1000)::double precision))`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	index("users_sync_deleted_at_idx").using("btree", table.deletedAt.asc().nullsLast().op("timestamptz_ops")),
]);
