import pool from "../db/pool.js";

async function getAllProducts() {
  const { rows } = await pool.query(`
    SELECT 
      p.id AS id,
      p.name AS name,
      p.description,
      p.price,
      p.quantity,
      p.brand,
      p.icon_src,
      c.id AS category_id,
      c.name AS category_name,
      c.color AS category_color,
      c.icon_src AS category_icon
    FROM products p
    JOIN categories c ON p.category_id = c.id
  `);

  return rows;
}

export default { getAllProducts };
