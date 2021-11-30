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
      return await createConnection(TEST_MYSQL_OPT);
    } else {
      return getConnection();
    }
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    await Promise.all(entities.map((e) => this.deleteAll(e.name)));
  },

  async deleteAll(entityName: string) {
    const connection = getConnection();
    const repository = connection.getRepository(entityName);
    return repository.clear();
  },

  async disconnect() {
    if (getConnectionManager().has("default")) {
      await getConnection().close();
    }
  },
};
