import { z } from "zod";

export const invoiceBodyRequest = z.object({
  salesPersonName: z.string().min(1),
  customerName: z.string().min(1),
  notes: z.string().optional(),
  productsSold: z.string().min(1),
  totalAmount: z.string().min(1),
});
