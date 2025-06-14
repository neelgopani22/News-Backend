import { Router } from "express";
import { getNewsPage } from "../controllers/news.controller";

const router = Router();

router.get("/news", getNewsPage as any);

export default router;
