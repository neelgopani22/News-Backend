import { Request, Response } from "express";
import { NewsModel } from "../models/news.model";
import { fetch } from "../common/service";

export const getNews = async (req: Request, res: Response) => {
  try {
    const { start_date } = req.query;
    const startDate = new Date(start_date as string);

    const pipeline = [
      {
        $match: {
          publish_date: { $gte: startDate },
        },
      },
    ];
    const news = await fetch(NewsModel(), pipeline);
    if (news.length > 0) {
      res.send({
        status: "success",
        data: news,
      });
    } else {
      res.status(404).json({ message: "No news found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
