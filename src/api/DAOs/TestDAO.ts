import { AllUsers } from "../../entities";
import { Op } from "sequelize";
export class TestDAO {
  public static async getTestData() {
    return `Hello World`;
  }
  // CREATE - Add a new user
  public static async createUser(userData: AllUsers) {
    try {
      return await AllUsers.create(userData);
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  // READ - Get a user by ID
  public static async getUserById(id: number) {
    try {
      const user = await AllUsers.findByPk(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      console.error(`Error retrieving user ${id}:`, error);
      throw error;
    }
  }

  // READ - Get all users with optional filtering
  public static async getAllUsers(filters?: {
    name?: string;
    department?: string;
    country?: string;
  }) {
    try {
      const whereClause: any = {};

      if (filters) {
        if (filters.name) {
          whereClause.name = { [Op.like]: `%${filters.name}%` };
        }
        if (filters.department) {
          whereClause.department = filters.department;
        }
        if (filters.country) {
          whereClause.country = filters.country;
        }
      }

      return await AllUsers.findAll({
        where: whereClause,
        order: [["id", "ASC"]],
      });
    } catch (error) {
      console.error("Error retrieving users:", error);
      throw new Error("Failed to retrieve users");
    }
  }

  // UPDATE - Update user data
  public static async updateUser(
    id: number,
    userData: Partial<{
      name: string;
      username: string;
      password: string;
      age: number;
      gender: "male" | "female" | "other";
      department: string;
      country: string;
      city: string;
      state: string;
      dob: Date;
      customer_id: string;
    }>
  ) {
    try {
      const user = await AllUsers.findByPk(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }

      await user.update(userData);
      return user;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  }

  // DELETE - Remove a user
  public static async deleteUser(id: number) {
    try {
      const user = await AllUsers.findByPk(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }

      await user.destroy();
      return true;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }
}

export default TestDAO;
