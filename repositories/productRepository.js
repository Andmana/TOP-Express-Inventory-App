import pool from "../db/pool.js";

async function getAllProducts(
  sort = "name",
  order = "asc",
  categoryQueries = [],
  name = ""
) {
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
    ${
      categoryQueries.length > 0
        ? `WHERE c.id IN (${categoryQueries.join(",")})`
        : ""
    }
    ${name !== "" ? `AND LOWER(p.name) LIKE  '%${name.toLowerCase()}%'` : ""}

    ORDER BY c.${sort} ${order}  
  `);

  return rows;
}

async function getProductById(id) {
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
    WHERE p.id = ${id}
  `);

  return rows[0] || null;
}

export default { getAllProducts, getProductById };
