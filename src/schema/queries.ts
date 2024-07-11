import { z } from "zod";

export const invoiceQueryRequest = z.object({
  page: z.string().optional(),
});
