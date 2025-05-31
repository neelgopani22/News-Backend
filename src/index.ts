import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import mongoose, { Connection } from "mongoose";
import routes from "./routes/index.routes";
import path from "path";
import { PORT, MONGO_SVR_private } from "./common/configuration";

let db1Connection: Connection;
const app: Express = express();
const port = PORT;

export const initializeConnections = async () => {
  if (MONGO_SVR_private != null) {
    db1Connection = await mongoose.createConnection(MONGO_SVR_private);
    handleConnectionEvents(db1Connection, "DB1");
  }
};
const handleConnectionEvents = (connection: Connection, dbName: string) => {
  connection.on("connected", () => {
    console.log(`Connected to ${dbName}`);
  });
  connection.on("error", (err) => {
    console.error(`Error while connecting to ${dbName}:`, err);
  });
  connection.on("disconnected", () => {
    console.warn(`Disconnected from ${dbName}`);
  });
};
export const getDB1Connection = () => {
  return db1Connection;
};

app.use(express.static(path.join(__dirname, "public")));
// app.use(
//   cors({
//     origin: "*",
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.listen(port, async () => {
  await initializeConnections();
  console.log(`[server]: server is running a https://localhost:${port}`);
});
