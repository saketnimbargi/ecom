import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllUsersTable1742220459451 implements MigrationInterface {
    name = 'CreateAllUsersTable1742220459451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`all_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`age\` int NULL, \`gender\` enum ('male', 'female', 'other') NULL, \`department\` varchar(255) NULL, \`country\` varchar(255) NULL, \`city\` varchar(255) NULL, \`state\` varchar(255) NULL, \`dob\` date NULL, \`create_dt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_dt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customer_id\` varchar(255) NULL, UNIQUE INDEX \`IDX_ee52d7affb354bf36b30518715\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ee52d7affb354bf36b30518715\` ON \`all_users\``);
        await queryRunner.query(`DROP TABLE \`all_users\``);
    }

}
