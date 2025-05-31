import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const API_KEY = process.env.API_KEY;
export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
export const MONGO_SVR_private = process.env.MONGO_SVR_private;
export const CLIENT_ID = process.env.CLIENT_ID;
export const BASE_URL = process.env.BASE_URL;
export const conenctionStringiReportAuto =
  process.env.conenctionStringiReportAuto;
export const APP_INSIGHTS_INSTRUMENTATION_KEY =
  process.env.APP_INSIGHTS_INSTRUMENTATION_KEY;
export const NODE_ENV = process.env.NODE_ENV;
export const ireportAutoContainer = process.env.iReportContainer;
export const reviewContainer = process.env.reviewContainer;
export const extractContainer = process.env.extractContainer;
export const fromEmail = process.env.fromEmail;
export const TimeToRecheck = process.env.TimeToRecheck;
export const scheduleDBName = process.env.scheduleDBName;
