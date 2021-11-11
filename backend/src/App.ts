import "reflect-metadata";
import express from "express";
import GraphQLMiddleware from "./graphql";
import { createConnection } from "typeorm";
import cors from "cors";
const DB_CONN_INFO = require("../ormconfig.json");
let env = null;
if (process.env.NODE_ENV === "production") {
  env = "production";
} else {
  env = "test";
}

(async () => {
  const app = express();
  // DB 커넥션 생성
  createConnection(DB_CONN_INFO[env]);

  const gqMiddleware = await GraphQLMiddleware.get();

  app.use(cors());

  app.use("/graphql", gqMiddleware);

  if (process.env.NODE_ENV === "production") {
    console.info("!!! THIS IS PRODUCTION MODE !!!");
    app.listen(3000, () => console.log("server is ON at 4000(PRODUCTION)"));
  } else {
    app.listen(3000, () => console.log("server is ON at 3000(TEST/DEV)"));
  }
})();
