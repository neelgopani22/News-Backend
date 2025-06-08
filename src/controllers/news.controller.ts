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

export const getNewsNewer = async (req: Request, res: Response) => {
  try {
    // 1) Parse query params
    const pageSize = parseInt((req.query.limit as string) || "20", 10);
    const sinceStr = req.query.since as string | undefined;

    if (!sinceStr) {
      // If `since` is missing, just return empty data (client can treat this as “no new items”)
      return res.json({
        status: "success",
        data: [],
        latestId: null,
      });
    }

    // Validate that sinceStr is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(sinceStr)) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid since parameter" });
    }

    const sinceId = new mongoose.Types.ObjectId(sinceStr);

    // 2) Fetch items with _id > sinceId, sorted ascending (oldest of the new first)
    const newItemsAsc = await NewsModel()
      .find({ _id: { $gt: sinceId } })
      .sort({ _id: 1 })
      .limit(pageSize)
      .exec();

    // 3) Reverse so that the client sees newest→oldest
    const newItemsDesc = newItemsAsc.slice().reverse();

    // 4) Determine latestId (the first element’s _id in newItemsDesc) or fallback to since
    const latestId =
      newItemsDesc.length > 0 ? newItemsDesc[0]._id.toString() : sinceStr;

    return res.json({
      status: "success",
      data: newItemsDesc,
      latestId,
    });
  } catch (err) {
    console.error("Error in getNewsNewer:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error", error: err });
  }
};
