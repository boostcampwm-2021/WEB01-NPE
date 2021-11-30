import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ConnectionOptions, createConnection, getConnection } from "typeorm";
const DB_CONN_OPTIONS: Record<
  string,
  ConnectionOptions
> = require("../ormconfig.json");
import * as socketio from "socket.io";
import socketModule from "./socket";
import { Server } from "http";
import { buildSchema } from "type-graphql";
import * as Resolver from "./resolvers";
import { graphqlHTTP } from "express-graphql";
import { useContainer } from "typeorm";
import { Container as typeDiContainer } from "typedi";
import Auth from "./middlewares/Auth";
import InitInjection from "./InjectionConfig";

// typeorm Container로 typeDI Container사용
useContainer(typeDiContainer);

(async () => {
  let env = "";
  if (["production", "test", "development"].includes(process.env.NODE_ENV))
    env = process.env.NODE_ENV;
  else process.exit();

  const app = express();
  await createConnection(DB_CONN_OPTIONS[env]);

  InitInjection();
  app.use(cors());

  const gqMiddleware = await graphQLMiddleware();
  app.use("/graphql", gqMiddleware);

  let server: Server = null;
  if (env === "production") {
    console.info("!!! THIS IS PRODUCTION MODE !!!");
    server = app.listen(4000, () =>
      console.log("server is ON at 4000(PRODUCTION)")
    );
  } else {
    server = app.listen(4000, () =>
      console.log("server is ON at 4000(TEST/DEV)")
    );
  }

  const io = new socketio.Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
    path: "/socket",
  });
  socketModule(io);
})();

const graphQLMiddleware = async () => {
  const schema = await buildSchema({
    resolvers: [
      Resolver.UserResolver,
      Resolver.QuestionResolver,
      Resolver.TagResolver,
      Resolver.AnswerResolver,
    ],
    globalMiddlewares: [Auth],
  });

  return graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV !== "production",
  });
};
