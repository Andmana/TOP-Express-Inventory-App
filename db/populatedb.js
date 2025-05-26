import { Client } from "pg";
import "dotenv/config";

const IS_DEV = process.env.NODE_ENV === "dev";
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const SQL = `
DROP TABLE IF EXISTS categories;
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255) UNIQUE,
  color VARCHAR(10),
  icon_src VARCHAR(255)
);

INSERT INTO categories (name, color, icon_src) VALUES
  ('Fruits', '#FF6347', '/icons/fruits.svg'),
  ('Vegetables', '#32CD32', '/icons/vegetables.svg'),
  ('Dairy', '#FFD700', NULL),
  ('Bakery', '#FF69B4', '/icons/bakery.svg'),
  ('Beverages', '#1E90FF', '/icons/beverages.svg');
`;

async function main() {
  console.log("Seeding...");

  const client = new Client({
    connectionString: CONNECTION_STRING,
    ssl: IS_DEV ? false : { rejectUnauthorized: false }, // ssl option adjusted for security
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Done seeding the database.");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await client.end();
  }
}

main();
