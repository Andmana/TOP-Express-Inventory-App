import { Pool } from "pg";
import "dotenv/config";

// Destructure and check required environment variables
const { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } =
  process.env;

// Validate environment variables
if (!DATABASE_HOST || !DATABASE_NAME || !DATABASE_USER || !DATABASE_PASSWORD) {
  throw new Error("Missing required environment variables.");
}

export default new Pool({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  ssl: {
    rejectUnauthorized: false, // Add this for non-production environments like local development
  },
});
