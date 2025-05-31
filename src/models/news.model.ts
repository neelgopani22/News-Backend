import { Schema } from "mongoose";
import { getDB1Connection } from "..";
import { News } from "../interface/news.interface";

const NewsSchema = new Schema<News>({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  url: { type: String, required: true },
  image: { type: String, required: true },
  video: { type: String, required: true },
  publish_date: { type: Date, required: true },
  author: { type: String, required: true },
  authors: { type: [String], required: true },
  language: { type: String, required: true },
  category: { type: String, required: true },
  source_country: { type: String, required: true },
  sentiment: { type: String, required: true },
  title_hash: { type: String, required: true },
});

export const NewsModel = () => {
  const db = getDB1Connection();
  return db.model<News>("IN_News", NewsSchema, "IN_News");
};
