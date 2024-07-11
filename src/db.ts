import { pgTable, serial, text, timestamp, varchar, integer, numeric } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  salesPersonName: varchar("sales_person_name").notNull(),
  customerName: varchar("customer_name").notNull(),
  notes: text("notes"),
  productsSold: text("products_sold").notNull(),
  totalAmount: numeric("total_amount").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;

const queryClient = postgres({
  user: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT ?? "5432"),
  host: process.env.DB_HOST,
});

const db = drizzle(queryClient);

export const createInvoice=(newInvoice: NewInvoice) => {
  return db.insert(invoices).values(newInvoice).returning();
};
