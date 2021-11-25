import {MigrationInterface, QueryRunner} from "typeorm";

export class QuestionAdoptedColumn1637838136299 implements MigrationInterface {
    name = 'QuestionAdoptedColumn1637838136299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_question\` ADD \`adopted\` tinyint NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_question\` DROP COLUMN \`adopted\``);
    }

}
