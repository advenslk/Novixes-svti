import { sql } from "drizzle-orm";
import { index, jsonb, pgTable, timestamp, varchar, numeric } from "drizzle-orm/pg-core";

export const sessionsTable = pgTable("sessions", {
  sid: varchar("sid").primaryKey(),
  sess: jsonb("sess").notNull(),
  expire: timestamp("expire").notNull(),
}, (table) => [index("IDX_session_expire").on(table.expire)]);

export const usersTable = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const ordersTable = pgTable("orders", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => usersTable.id),
  plan: varchar("plan").notNull(),
  service: varchar("service").notNull(),
  region: varchar("region").notNull(),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status").notNull().default("received"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type User = typeof usersTable.$inferSelect;
export type Order = typeof ordersTable.$inferSelect;