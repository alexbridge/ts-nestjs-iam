import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1705432195183 implements MigrationInterface {
  name = 'User1705432195183';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "user" (
            "id" SERIAL NOT NULL,
            "user_id" character varying NOT NULL,
            "full_name" character varying NOT NULL,
            CONSTRAINT "primary_id" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`CREATE INDEX "user_id" ON "user" ("user_id") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."user_id"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
