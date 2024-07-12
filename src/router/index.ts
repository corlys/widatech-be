import express from "express";
import {
  createInvoice,
  getDailyRevenue,
  getMonthlyRevenue,
  getWeeklyRevenue,
  getInvoicesWithPg,
} from "../db";
import { invoiceBodyRequest } from "../schema/bodies";
import { invoiceQueryRequest, revenueQueryRequest } from "../schema/queries";
import { StatusCodes } from "http-status-codes";

import "dotenv/config";

const router = express.Router();

router.get("/invoice", async (req, res) => {
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

router.post("/invoice", async (req, res) => {
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

router.get("/revenue", async (req, res) => {
  try {
    const parsedQuery = revenueQueryRequest.safeParse(req.query);
    if (!parsedQuery)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Bad Request" });
    switch (parsedQuery.data?.type) {
      case "daily":
        const daily = await getDailyRevenue();
        return res.status(StatusCodes.OK).json({
          revenues: daily,
        });
      case "weekly":
        const weekly = await getWeeklyRevenue();
        return res.status(StatusCodes.OK).json({
          revenues: weekly,
        });
      case "monthly":
        const monthly = await getMonthlyRevenue();
        return res.status(StatusCodes.OK).json({
          revenues: monthly,
        });
      default:
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Not Found" });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
});

export default router;
