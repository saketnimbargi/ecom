import { AllUsers } from "src/entities";
import {TestDAO} from "../DAOs";

export class TestService {
  public static async testService() {
    return await TestDAO.getTestData();
  }

  public static async createUser(userData: AllUsers) {
    return await TestDAO.createUser(userData);
  }

  public static async getUserById(id: number) {
    return await TestDAO.getUserById(id);
  }

  public static async deleteUserById(id: number) {
    return await TestDAO.deleteUser(id);
  }
}
