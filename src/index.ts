import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { DataSource } from "typeorm";
import mongoose from "mongoose";
import { Routes } from "./routes";
// import { errorHandler } from "./middleware/errorHandler";
import { dbConfig } from "./config/DbConnection";
// import { Logger } from "./logger";

export class App {
  public app: Application;
  public routes: Routes = new Routes();
  private readonly port: number;
  private dataSource: DataSource;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "4001");
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.connectToDatabases();
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

  private async connectToDatabases(): Promise<void> {
    try {
      // Connect to MySQL using TypeORM DataSource (non-deprecated approach)
      this.dataSource = new DataSource(dbConfig.mysql);
      await this.dataSource.initialize();
      // Logger.info("Connected to MySQL database");

      // Connect to MongoDB using Mongoose
      await mongoose.connect(dbConfig.mongodb.uri as string);
      // Logger.info("Connected to MongoDB database");
    } catch (error) {
      console.error("Database connection error:", error);
      process.exit(1);
    }
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.info(`Server running on port ${this.port}`);
    });
  }

  // Method to get the DataSource instance for use in repositories
  public getDataSource(): DataSource {
    return this.dataSource;
  }
}
