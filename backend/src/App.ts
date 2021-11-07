import "reflect-metadata";
import express from "express";
import { Request, Response } from "express";
import GraphQLMiddleware from "./graphql";
import { createConnection } from "typeorm";

const app = express();
// DB 커넥션 생성
createConnection();

GraphQLMiddleware.get().then((middleware) => {
  app.use("/graphql", middleware);

  app.get("/", (req: Request, res: Response) => {
    res.send("hi!");
  });

  app.listen(3000, () => console.log("server is ON at 3000"));
});
