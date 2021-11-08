import "reflect-metadata";
import express from "express";
import GraphQLMiddleware from "./graphql";
import { createConnection } from "typeorm";

(async () => {
  const app = express();
  // DB 커넥션 생성
  createConnection();

  const gqMiddleware = await GraphQLMiddleware.get();

  app.use("/graphql", gqMiddleware);

  app.listen(3000, () => console.log("server is ON at 3000"));
})();
