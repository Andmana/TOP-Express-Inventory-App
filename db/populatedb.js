import { Client } from "pg";
import "dotenv/config";

const SQL = `
DROP TABLE IF EXISTS categories;
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255),
  color VARCHAR(10),
  icon VARCHAR(255)
);

INSERT INTO categories (name, color, icon) VALUES
  ('Fruits', '#FF6347', 'fruit.svg'),
  ('Vegetables', '#32CD32', 'vegetable.svg'),
  ('Dairy', '#FFD700', 'dairy.svg'),
  ('Bakery', '#FF69B4', 'bread.svg'),
  ('Beverages', '#1E90FF', 'drink.svg');
`;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }, // ssl option adjusted for security
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
