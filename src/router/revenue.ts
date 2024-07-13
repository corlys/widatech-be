import express from "express";
import { getDailyRevenue, getMonthlyRevenue, getWeeklyRevenue } from "../db";
import { revenueQueryRequest } from "../schema/queries";
import { StatusCodes } from "http-status-codes";

import "dotenv/config";

const router = express.Router();

router.get("/", async (req, res) => {
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
