import {MigrationInterface, QueryRunner} from "typeorm";

export class QuestionThumbTable1637689386694 implements MigrationInterface {
    name = 'QuestionThumbTable1637689386694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`question_thumb\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`post_question_id\` int NOT NULL, \`value\` int NOT NULL, INDEX \`fk_question_thumb_post_question\` (\`post_question_id\`), INDEX \`fk_question_thumb_user\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`fk_question_thumb_user\` ON \`question_thumb\``);
        await queryRunner.query(`DROP INDEX \`fk_question_thumb_post_question\` ON \`question_thumb\``);
        await queryRunner.query(`DROP TABLE \`question_thumb\``);
    }

}
