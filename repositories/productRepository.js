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

    ORDER BY p.${sort} ${order}  
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
      c.icon_src AS category_icon,
      p.is_sample
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

async function deleteProductById(id) {
  const { rowCount } = await pool.query(`DELETE FROM products WHERE id = $1`, [
    id,
  ]);

  return rowCount > 0; // returns true if a row was deleted, false otherwise
}

async function updateProduct(data) {
  const {
    id,
    name,
    price,
    quantity,
    description,
    brand,
    category_id,
    icon_src,
  } = data;

  const fields = [];
  const values = [];
  let idx = 1;
  console.log(
    id,
    name,
    price,
    quantity,
    description,
    brand,
    category_id,
    icon_src
  );

  if (name !== undefined) {
    fields.push(`name = $${idx++}`);
    values.push(name);
  }
  if (category_id !== undefined) {
    fields.push(`category_id = $${idx++}`);
    values.push(category_id);
  }
  if (price !== undefined) {
    fields.push(`price = $${idx++}`);
    values.push(price);
  }
  if (quantity !== undefined) {
    fields.push(`quantity = $${idx++}`);
    values.push(quantity);
  }
  if (description !== undefined) {
    fields.push(`description = $${idx++}`);
    values.push(description);
  }
  if (brand !== undefined) {
    fields.push(`brand = $${idx++}`);
    values.push(brand);
  }
  if (icon_src !== undefined) {
    fields.push(`icon_src = $${idx++}`);
    values.push(icon_src);
  }

  if (fields.length === 0) {
    throw new Error("No fields to update.");
  }

  values.push(id); // Final param is for WHERE clause

  const query = `
    UPDATE products
    SET ${fields.join(", ")}
    WHERE id = $${idx}
  `;

  const { rowCount } = await pool.query(query, values);
  return rowCount; // 0 if nothing was updated, 1 if successful
}

export default {
  getAllProducts,
  getProductById,
  createProduct,
  isNameExists,
  deleteProductById,
  updateProduct,
};
