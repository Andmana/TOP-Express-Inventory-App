import pool from "../db/pool.js";

async function getAllCategories() {
  const { rows } = await pool.query("select * from categories");
  return rows;
}

export default { getAllCategories };
