import "reflect-metadata";
import express from "express";
import GraphQLMiddleware from "./graphql";
import cors from "cors";
import { ConnectionOptions, createConnection, getConnection } from "typeorm";
const DB_CONN_OPTIONS: Record<
  string,
  ConnectionOptions
> = require("../ormconfig.json");
import * as socketio from "socket.io";
import socketModule from "./socket";
import { Server } from "http";

(async () => {
  let env = "";
  if (["production", "test", "development"].includes(process.env.NODE_ENV))
    env = process.env.NODE_ENV;
  else process.exit();

  const app = express();
  await createConnection(DB_CONN_OPTIONS[env]);

  const gqMiddleware = await GraphQLMiddleware.get();

  app.use(cors());

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
  });
  socketModule(io);
})();
