import AppDataSource from "../../config/DbConnection";
import {AllUsers} from "../../entities/AllUsers";

export class TestDAO {

    public static async getTestData(){
        return AppDataSource
            .getRepository(AllUsers)
            .createQueryBuilder("au")
            .where(`au.id = :id`, {id: 1})
            .getOne();
    }
}

export default new TestDAO();
