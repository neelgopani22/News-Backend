import { Router } from "express";
import newsRoutes from "./news.routes";

const routes = Router();

routes.use("/v1", newsRoutes);

export default routes;
