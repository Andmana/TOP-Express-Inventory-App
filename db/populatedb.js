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


  DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE,
  description VARCHAR(255),
  price DOUBLE PRECISION,
  category_id INTEGER,
  quantity INTEGER,
  brand VARCHAR(256), 
  icon_src VARCHAR(255)
);

INSERT INTO products (name, description, price, category_id, quantity, brand, icon_src) VALUES
-- Fruits (category_id = 1)
('Red Apples', 'Fresh and crispy red apples.', 2.99, 1, 50, 'NatureFarms', '/icons/apple.svg'),
('Bananas', 'Sweet ripe bananas.', 1.49, 1, 100, 'TropicalFresh', '/icons/banana.svg'),

-- Vegetables (category_id = 2)
('Carrots', 'Organic orange carrots.', 0.99, 2, 80, 'GreenGrow', '/icons/carrot.svg'),
('Spinach', 'Fresh baby spinach.', 1.99, 2, 60, 'LeafyLand', '/icons/spinach.svg'),

-- Dairy (category_id = 3)
('Whole Milk', 'Creamy whole milk, 1L.', 1.89, 3, 200, 'default', 'icons/milk.svg'),
('Cheddar Cheese', 'Aged cheddar block, 200g.', 3.49, 3, 40, 'default', '/icons/cheese.svg'),

-- Bakery (category_id = 4)
('Sourdough Bread', 'Handmade sourdough loaf.', 2.49, 4, 30, 'BakersDaily', '/icons/bread.svg'),
('Croissant', 'Buttery croissant pastry.', 1.29, 4, 60, 'ParisBake', '/icons/croissant.svg'),

-- Beverages (category_id = 5)
('Orange Juice', 'Freshly squeezed, 500ml.', 2.59, 5, 70, 'JuicyJoy', '/icons/juice.svg'),
('Coffee Beans', 'Medium roast Arabica beans.', 7.99, 5, 25, 'BeanBrew', '/icons/coffe.svg');


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
