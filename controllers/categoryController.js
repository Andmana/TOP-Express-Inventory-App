import categoryRepository from "../repositories/categoryRepository.js";

/**
 *
 * @desc  GET all categories
 * @route GET /categories
 */
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryRepository.getAllCategories();
    res.render("category/index", {
      categories,
    });
  } catch (error) {
    next(new Error("Internal server error"));
  }
};

export default { getAllCategories };
