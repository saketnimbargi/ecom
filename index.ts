import "reflect-metadata";
import { config } from "dotenv";
import { App } from "./src";


// Load environment variables
config();

// Wrap the app initialization in a proper async function with error handling
async function bootstrap() {
  try {
    // Initialize the app only after DB connection is successful
    const app = new App();
  

    // Connect to databases first
    await app.connectToDatabases();

    // Start the server
    app.listen();

    // Handle process termination
    process.on("SIGINT", async () => {
      console.log("Received SIGINT. Graceful shutdown...");
      await app.close();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.log("Received SIGTERM. Graceful shutdown...");
      await app.close();
      process.exit(0);
    });
  } catch (error) {
    console.error("Application failed to start:", error);
  }
}

// Start the application
bootstrap().catch(err => {
  console.error("Unhandled error during bootstrap:", err);
  process.exit(1);
});
