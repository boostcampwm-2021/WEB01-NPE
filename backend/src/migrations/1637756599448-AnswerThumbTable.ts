import {MigrationInterface, QueryRunner} from "typeorm";

export class AnswerThumbTable1637756599448 implements MigrationInterface {
    name = 'AnswerThumbTable1637756599448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`answer_thumb\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`post_answer_id\` int NOT NULL, \`value\` int NOT NULL, INDEX \`fk_answer_thumb_post_answer\` (\`post_answer_id\`), INDEX \`fk_answer_thumb_user\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`fk_answer_thumb_user\` ON \`answer_thumb\``);
        await queryRunner.query(`DROP INDEX \`fk_answer_thumb_post_answer\` ON \`answer_thumb\``);
        await queryRunner.query(`DROP TABLE \`answer_thumb\``);
    }

}
