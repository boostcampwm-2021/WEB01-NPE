import "reflect-metadata";
import {
  ConnectionOptions,
  createConnection,
  getConnection,
  getConnectionManager,
  useContainer,
} from "typeorm";
import { Container } from "typeorm-typedi-extensions";
const TEST_MYSQL_OPT: ConnectionOptions =
  require("../ormconfig.json")["test-mysql"];

export default {
  async connectIfNotExists() {
    if (!getConnectionManager().has("default")) {
      useContainer(Container);
      // connect to sqlite DB
      return await createConnection(TEST_MYSQL_OPT);
    }
  },

  async disconnect() {
    if (getConnectionManager().has("default")) {
      await getConnection().close();
    }
  },
};
