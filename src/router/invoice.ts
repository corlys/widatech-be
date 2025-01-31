import express from "express";
import {
  createInvoice,
  getInvoicesWithPg,
} from "../db";
import { invoiceBodyRequest } from "../schema/bodies";
import { invoiceQueryRequest, revenueQueryRequest } from "../schema/queries";
import { StatusCodes } from "http-status-codes";

import "dotenv/config";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const parsedQuery = invoiceQueryRequest.safeParse(req.query);
    if (!parsedQuery.success) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: parsedQuery.error.toString() });
    }
    const LIMIT = 3;
    const result = await getInvoicesWithPg(
      parseInt(parsedQuery.data?.page ?? "1"),
      LIMIT
    );
    const hasNextPage = await getInvoicesWithPg(
      parseInt(parsedQuery.data?.page ?? "1") + 1,
      LIMIT
    );
    return res
      .status(StatusCodes.OK)
      .json({ invoices: result, hasNextPage: hasNextPage.length > 0 });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const parsedBody = invoiceBodyRequest.safeParse(req.body);
    if (!parsedBody.success) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: parsedBody.error.toString() });
    }
    await createInvoice(parsedBody.data);
    res
      .status(StatusCodes.OK)
      .json({ message: "Invoice created successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
});

export default router;
