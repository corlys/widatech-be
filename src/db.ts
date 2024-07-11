import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  salesPersonName: varchar("sales_person_name").notNull(),
  customerName: varchar("customer_name").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;

const queryClient = postgres(process.env.DB ?? "");
const db = drizzle(queryClient);

export async function createInvoice(newInvoice: NewInvoice) {
  return db.insert(invoices).values(newInvoice).returning();
}
