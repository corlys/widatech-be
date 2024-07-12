import { z } from "zod";

export const invoiceQueryRequest = z.object({
  page: z.string().optional(),
});

export const revenueQueryRequest = z.object({
  type: z.enum(["daily", "weekly", "monthly"]),
});
