import "reflect-metadata";
import {
  ConnectionOptions,
  createConnection,
  getConnection,
  getConnectionManager,
} from "typeorm";
const TEST_MYSQL_OPT: ConnectionOptions = require("../../ormconfig.json")[
  "test-mysql"
];

export default {
  conn: null,

  async connectIfNotExists() {
    if (!getConnectionManager().has("default")) {
      this.conn = await createConnection(TEST_MYSQL_OPT);
    }
    return this.conn;
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    await Promise.all(entities.map((e) => this.deleteAll(e.name)));
  },

  async deleteAll(entityName: string) {
    const connection = getConnection();
    const repository = connection.getRepository(entityName);
    return repository.delete({});
  },

  async disconnect() {
    if (getConnectionManager().has("default")) {
      await getConnection().close();
    }
  },
};
