import pool from "../db/pool.js";

async function getAllCategories() {
  const { rows } = await pool.query("select * from categories");
  return rows;
}

async function createCategory(data) {
  await pool.query(
    "INSERT INTO categories (name, color, icon_src) values($1, $2, $3)",
    [data.name, data.color, data.icon_src]
  );
}

async function isNameExists(name) {
  const { rows } = await pool.query(
    "SELECT 1 FROM categories WHERE LOWER(name) = LOWER($1)",
    [name]
  );
  return rows.length;
}

export default { getAllCategories, createCategory, isNameExists };
