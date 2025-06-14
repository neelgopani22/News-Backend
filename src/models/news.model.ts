import mongoose, { Schema } from "mongoose";
import { getDB1Connection } from "..";
import { News } from "../interface/news.interface";

const NewsSchema = new Schema<News>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: null,
    },

    video: {
      type: String,
      default: null,
    },

    publish_date: {
      type: Date,
      required: true,
      index: true,
    },

    author: {
      type: String,
      required: true,
    },

    authors: {
      type: [String],
      required: true,
      default: [],
    },

    language: {
      type: String,
      required: true,
      default: "en",
    },

    category: {
      type: String,
      required: true,
    },

    source_country: {
      type: String,
      required: true,
    },

    sentiment: {
      type: Number,
      required: true,
      default: 0.0,
    },

    title_hash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: false,
    collection: "IN_News",
  }
);

// Export a function that returns a model bound to the current connection
export const NewsModel = (): mongoose.Model<News> => {
  const db = getDB1Connection();
  return db.model<News>("IN_News", NewsSchema, "IN_News");
};
