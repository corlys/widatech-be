import express from "express";
import { createInvoice, getInvoicesWithPg } from "../db";
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

router.get("/invoice", async (req, res) => {
  try {
    const result = await getInvoicesWithPg(3, 3);
    return res.json({ result })
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal server error"});
  }
})

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
