import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { Routes } from "./routes";
import sequelize, { initializeDatabase } from "./config/DbConnection";
import { mongoConfig } from "./config/DbConnection";

export class App {
  public app: Application;
  public routes: Routes = new Routes();
  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "4001");
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(helmet());
  }

  private initializeRoutes(): void {
    this.routes.routesInit(this.app);
  }

  private initializeErrorHandling(): void {
    // this.app.use(errorHandler);
  }

  public async connectToDatabases(): Promise<void> {
    try {
      // Initialize Sequelize and all models
      await initializeDatabase();
      console.info("Connected to MySQL database and initialized models");

      // Connect to MongoDB using Mongoose
      try {
        await mongoose.connect(mongoConfig.uri);
        console.info("Connected to MongoDB database");
      } catch (mongoError) {
        console.warn(
          "Could not connect to MongoDB. Running in MySQL-only mode."
        );
        const errMessage = mongoError as unknown as Error;
        console.warn("MongoDB error:", errMessage.message);
      }
    } catch (error) {
      console.error("Database connection error:", error);
      throw error;
    }
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.info(`Server running on port ${this.port}`);
    });
  }

  public async close(): Promise<void> {
    try {
      // Close Sequelize connection (MySQL)
      if (sequelize) {
        await sequelize.close();
        console.info("MySQL connection closed");
      }

      // Close Mongoose connection (MongoDB)
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        console.info("MongoDB connection closed");
      }

      // Any other cleanup tasks can go here
      // For example: closing redis clients, terminating workers, etc.

      console.info("All connections closed successfully");
    } catch (error) {
      console.error("Error during application shutdown:", error);
    }
  }
}
