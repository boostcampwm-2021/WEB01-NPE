import {MigrationInterface, QueryRunner} from "typeorm";

export class UserHasTagCountMigration1636635559207 implements MigrationInterface {
    name = 'UserHasTagCountMigration1636635559207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_has_tag\` DROP FOREIGN KEY \`FK_5b70c8099b060984f3dc54d5e58\``);
        await queryRunner.query(`ALTER TABLE \`user_has_tag\` DROP FOREIGN KEY \`FK_7789669b779d3cb3f7fbd1dcec2\``);
        await queryRunner.query(`DROP INDEX \`IDX_5b70c8099b060984f3dc54d5e5\` ON \`user_has_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_7789669b779d3cb3f7fbd1dcec\` ON \`user_has_tag\``);
        await queryRunner.query(`ALTER TABLE \`user_has_tag\` ADD \`count\` int NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`fk_user_has_tag_tag1_idx\` ON \`user_has_tag\` (\`tag_id\`)`);
        await queryRunner.query(`CREATE INDEX \`fk_user_has_tag_user1_idx\` ON \`user_has_tag\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_has_tag\` ADD CONSTRAINT \`FK_5b70c8099b060984f3dc54d5e58\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_has_tag\` ADD CONSTRAINT \`FK_7789669b779d3cb3f7fbd1dcec2\` FOREIGN KEY (\`tag_id\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_has_tag\` DROP FOREIGN KEY \`FK_7789669b779d3cb3f7fbd1dcec2\``);
        await queryRunner.query(`ALTER TABLE \`user_has_tag\` DROP FOREIGN KEY \`FK_5b70c8099b060984f3dc54d5e58\``);
        await queryRunner.query(`DROP INDEX \`fk_user_has_tag_user1_idx\` ON \`user_has_tag\``);
        await queryRunner.query(`DROP INDEX \`fk_user_has_tag_tag1_idx\` ON \`user_has_tag\``);
        await queryRunner.query(`ALTER TABLE \`user_has_tag\` DROP COLUMN \`count\``);
        await queryRunner.query(`CREATE INDEX \`IDX_7789669b779d3cb3f7fbd1dcec\` ON \`user_has_tag\` (\`tag_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_5b70c8099b060984f3dc54d5e5\` ON \`user_has_tag\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_has_tag\` ADD CONSTRAINT \`FK_7789669b779d3cb3f7fbd1dcec2\` FOREIGN KEY (\`tag_id\`) REFERENCES \`tag\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_has_tag\` ADD CONSTRAINT \`FK_5b70c8099b060984f3dc54d5e58\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
