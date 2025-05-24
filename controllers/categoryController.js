import categoryRepository from "../repositories/categoryRepository.js";

/**
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

/**
 * @desc  GET create categories form view
 * @route GET /categories/create
 */
const getCreate = async (req, res, next) => {
  try {
    res.render("category/create");
  } catch (error) {
    next(new Error("Internal server error"));
  }
};

export default { getAllCategories, getCreate };
