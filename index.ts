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
    app.listen();
  } catch (error) {
    console.error("Application failed to start:", error);
  }
}

// Start the application
bootstrap().catch(err => {
  console.error("Unhandled error during bootstrap:", err);
  process.exit(1);
});
