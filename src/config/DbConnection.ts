import { Sequelize, Options } from "sequelize";
import { config } from "dotenv";
import mongoose from "mongoose";
import { EventEmitter } from "events";
import { initModels } from "../entities";

// Increase Node.js EventEmitter default max listeners
EventEmitter.defaultMaxListeners = 20;

// Load environment variables
config();

// MySQL configuration
const mysqlConfig: Options = {
  host: process.env.MYSQL_HOST || "localhost",
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "ecommerce",
  dialect: "mysql",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// MongoDB configuration
export const mongoConfig = {
  uri: process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce",
};

// Create a singleton Sequelize instance
class Database {
  private static instance: Database;
  private _sequelize: Sequelize;
  private _initialized = false;

  private constructor() {
    this._sequelize = new Sequelize(
      mysqlConfig.database as string,
      mysqlConfig.username as string,
      mysqlConfig.password as string,
      mysqlConfig
    );
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public get sequelize(): Sequelize {
    return this._sequelize;
  }

  public async initialize(): Promise<void> {
    if (this._initialized) {
      return;
    }

    try {
      // Test the connection
      await this._sequelize.authenticate();
      console.log("MySQL connection has been established successfully.");

      // Initialize all models
      initModels(this._sequelize);

      this._initialized = true;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      throw error;
    }
  }
}

// Get the Database instance
const db = Database.getInstance();

// Handle process exit properly
const exitHandler = async () => {
  try {
    await db.sequelize.close();
    console.log("MySQL connection closed");

    if (mongoose.connection.readyState) {
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
    }
  } catch (err) {
    console.error("Error closing database connections:", err);
  }
  process.exit(0);
};

// Handle application shutdown gracefully
process.on("SIGINT", exitHandler);
process.on("SIGTERM", exitHandler);
process.once("SIGUSR2", exitHandler); // For nodemon restarts

// Export the Sequelize instance
export default db.sequelize;

// Export initialize method for use in app.ts
export const initializeDatabase = async (): Promise<void> => {
  await db.initialize();
};