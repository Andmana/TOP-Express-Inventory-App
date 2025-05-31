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

async function createProduct(data) {
  await pool.query(
    "INSERT INTO products (name, category_id, description, price, quantity, brand, icon_src) values($1, $2, $3, $4, $5, $6, $7)",
    [
      data.name,
      data.category_id,
      data.description,
      data.price,
      data.quantity,
      data.brand,
      data.icon_src,
    ]
  );
}

async function isNameExists(name, id = 0) {
  if (id === 0) {
    const { rows } = await pool.query(
      "SELECT 1 FROM products WHERE LOWER(name) = LOWER($1)",
      [name]
    );
    return rows.length;
  } else {
    const { rows } = await pool.query(
      "SELECT 1 FROM products WHERE LOWER(name) = LOWER($1) AND id != $2",
      [name, id]
    );
    return rows.length;
  }
}

export default { getAllProducts, getProductById, createProduct, isNameExists };
