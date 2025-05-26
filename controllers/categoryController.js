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

const postCreate = async (req, res, next) => {
  try {
    const { name, color } = req.body;
    console.log(name, color);
    res.render("category/create");
  } catch (error) {
    console.log(error);
  }
};

export default { getAllCategories, getCreate, postCreate };
