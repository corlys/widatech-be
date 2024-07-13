import { asc, desc, sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  numeric,
} from "drizzle-orm/pg-core";
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

export const createInvoice = (newInvoice: NewInvoice) => {
  return db.insert(invoices).values(newInvoice).returning();
};

export const getInvoicesWithPg = async (page = 1, limit = 5) => {
  const ITEM_PERPAGE = 3;
  return await db
    .select()
    .from(invoices)
    .offset((page - 1) * ITEM_PERPAGE)
    .limit(limit)
    .orderBy(desc(invoices.createdAt));
};

export async function getDailyRevenue() {
  return db
    .select({
      date: sql<Date>`DATE_TRUNC('day', ${invoices.createdAt})`.as("date"),
      revenue: sql<number>`SUM(${invoices.totalAmount})`.as("revenue"),
    })
    .from(invoices)
    .groupBy(sql`DATE_TRUNC('day', ${invoices.createdAt})`)
    .orderBy(sql`DATE_TRUNC('day', ${invoices.createdAt})`);
}

export async function getWeeklyRevenue() {
  return db
    .select({
      date: sql<Date>`DATE_TRUNC('week', ${invoices.createdAt})`.as("date"),
      revenue: sql<number>`SUM(${invoices.totalAmount})`.as("revenue"),
    })
    .from(invoices)
    .groupBy(sql`DATE_TRUNC('week', ${invoices.createdAt})`)
    .orderBy(sql`DATE_TRUNC('week', ${invoices.createdAt})`);
}

export async function getMonthlyRevenue() {
  return db
    .select({
      date: sql<Date>`DATE_TRUNC('month', ${invoices.createdAt})`.as("date"),
      revenue: sql<number>`SUM(${invoices.totalAmount})`.as("revenue"),
    })  
    .from(invoices)
    .groupBy(sql`DATE_TRUNC('month', ${invoices.createdAt})`)
    .orderBy(sql`DATE_TRUNC('month', ${invoices.createdAt})`);
}
