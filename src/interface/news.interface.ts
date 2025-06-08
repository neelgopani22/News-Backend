export interface News {
  _id: string; // MongoDB ObjectId as a string
  id: number; // (if you still want to keep your external numeric “id” field)
  title: string;
  text: string;
  url: string;
  image: string | null;
  video: string | null;
  publish_date: Date;
  author: string;
  authors: string[];
  language: string;
  category: string;
  source_country: string;
  sentiment: number;
  title_hash: string;
}
