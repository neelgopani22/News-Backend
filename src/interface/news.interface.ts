export interface News {
  _id: string;
  title: string;
  text: string;
  url: string;
  image: string;
  video: string;
  publish_date: Date;
  author: string;
  authors: string[];
  language: string;
  category: string;
  source_country: string;
  sentiment: string;
  title_hash: string;
}
