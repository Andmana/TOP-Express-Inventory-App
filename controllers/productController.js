import productRepository from "../repositories/productRepository.js";
import categoryRepository from "../repositories/categoryRepository.js";
import getContrastColor from "../utils/contrastColors.js";

/**
 * @desc  GET all products with optional filtering and sorting
 * @route GET /products
 */
const getAllProducts = async (req, res, next) => {
  try {
    const {
      order = "asc",
      sort = "name",
      name = "",
      categories: categoriesQuery = "",
    } = req.query;

    // Convert comma-separated category IDs into an array of numbers
    const categoryIds = categoriesQuery
      .split(",")
      .map((id) => parseInt(id, 10))
      .filter(Number.isFinite);

    // Fetch data
    const [products, categories] = await Promise.all([
      productRepository.getAllProducts(sort, order, categoryIds, name),
      categoryRepository.getAllCategories(),
    ]);

    // Render the view
    res.render("product/index", {
      products,
      categories,
      getContrastColor,
    });
  } catch (error) {
    next(new Error(error.message || "Internal server error"));
  }
};

export default { getAllProducts };
