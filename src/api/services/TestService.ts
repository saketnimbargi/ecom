import {TestDAO} from "../DAOs";

export class TestService {
  public static async testService(){
    return await TestDAO.getTestData();
  }
}
