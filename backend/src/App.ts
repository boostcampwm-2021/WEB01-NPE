import express from "express";
import { Request, Response } from "express";
import GraphQLMiddleware from "./graphql";

const app = express();

app.use("/graphql", GraphQLMiddleware.get());

app.get("/", (req: Request, res: Response) => {
  res.send("hi!");
});

app.listen(3000, () => console.log("server is ON at 3000"));
