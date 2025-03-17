import { DataSourceOptions, DataSource } from "typeorm";
import { config } from "dotenv";


config();

export const dbConfig = {
  mysql: {
    type: "mysql",
    host: process.env.MYSQL_HOST || "localhost",
    port: parseInt(process.env.MYSQL_PORT || "3306"),
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "password",
    database: process.env.MYSQL_DATABASE || "ecommerce",
    entities: [__dirname + "/../entities/**/*.{ts,js}", __dirname + "/../**/*.entity.{ts,js}"],
    synchronize: false,
    logging: process.env.NODE_ENV === "development",
    migrations: [__dirname + "/../migrations/**/*.{ts,js}"],
    migrationsTableName: "migrations",
    // Add connection pooling options
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  } as DataSourceOptions,

  mongodb: {
    uri: process.env.MONGODB_URI,
  },
};

// Create and export a DataSource instance for CLI commands
const AppDataSource = new DataSource(dbConfig.mysql as DataSourceOptions);
export default AppDataSource;
