import { Router } from "express";
import { getNewsPage, getNewsNewer } from "../controllers/news.controller";

const router = Router();

router.get("/news", getNewsPage as any);
router.get("/news/newer", getNewsNewer as any);

export default router;
