import "reflect-metadata";
import {
  Connection,
  ConnectionOptions,
  createConnection,
  EntityManager,
  getConnection,
  getConnectionManager,
  useContainer,
} from "typeorm";
import { Container } from "typeorm-typedi-extensions";
const TEST_MYSQL_OPT: ConnectionOptions =
  require("../ormconfig.json")["test-mysql"];

export default {
  conn: null,

  async connectIfNotExists() {
    if (!getConnectionManager().has("default")) {
      useContainer(Container);
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

  async transaction(cb: (m: EntityManager) => Promise<void>) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction("READ UNCOMMITTED");
    const manager = queryRunner.manager;

    await cb(manager);

    await queryRunner.rollbackTransaction();
    await queryRunner.release();
  },

  async disconnect() {
    if (getConnectionManager().has("default")) {
      await getConnection().close();
    }
  },
};
