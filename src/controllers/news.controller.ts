import { Request, Response } from "express";
import mongoose from "mongoose";
import { NewsModel } from "../models/news.model";

export const getNewsPage = async (req: Request, res: Response) => {
  try {
    // 1) Parse query params
    const pageSize = parseInt((req.query.limit as string) || "20", 10);
    const cursorStr = req.query.cursor as string | undefined;

    let filter: any = {};
    if (cursorStr) {
      // Validate that cursorStr is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(cursorStr)) {
        return res
          .status(400)
          .json({ status: "error", message: "Invalid cursor parameter" });
      }
      filter._id = { $lt: new mongoose.Types.ObjectId(cursorStr) };
    }

    // 2) Query the next page of items
    const items = await NewsModel()
      .find(filter)
      .sort({ _id: -1 }) // newest→oldest
      .limit(pageSize)
      .exec();

    // 3) Determine nextCursor: the _id of the last (oldest) item in this batch
    const nextCursor = items.length
      ? items[items.length - 1]._id.toString()
      : null;

    return res.json({
      status: "success",
      data: items,
      nextCursor,
    });
  } catch (err) {
    console.error("Error in getNewsPage:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error", error: err });
  }
};
