import express from "express";
import { createInvoice } from "../db";
import { z } from "zod";
import "dotenv/config";

const invoiceInputSchema = z.object({
  salesPersonName: z.string().min(1),
  customerName: z.string().min(1),
  notes: z.string().optional(),
  productsSold: z.string().min(1),
  totalAmount: z.string().min(1)
});

const router = express.Router();

router.post("/invoice", async (req, res) => {
  try {
    const parsedBody = invoiceInputSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ message: parsedBody.error.toString() });
    }
    await createInvoice(parsedBody.data);
    res.status(200).json({ message: "Invoice created successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
