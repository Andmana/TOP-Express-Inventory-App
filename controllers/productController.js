import productRepository from "../repositories/productRepository.js";
import categoryRepository from "../repositories/categoryRepository.js";
import getContrastColor from "../utils/contrastColors.js";

/**
 * @desc  GET all categories
 * @route GET /categories
 */
const getAllProducts = async (req, res, next) => {
  // Get order and sort values
  const order = req.query.order || "asc"; // 'asc' or 'desc'
  const sort = req.query.sort || "name"; // 'name' or 'price'

  // Handle categories: parse from comma-separated string to array
  let categoryQueries = [];
  if (req.query.categories) {
    categoryQueries = req.query.categories
      .split(",")
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(id)); // ensure valid numbers
  }

  // Now you can use these for querying your DB, etc.
  console.log({ order, sort, categoryQueries });

  const products = await productRepository.getAllProducts();
  const categories = await categoryRepository.getAllCategories();
  res.render("product/index", { products, categories, getContrastColor });
};

export default { getAllProducts };
