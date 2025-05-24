import categoryRepository from "../repositories/categoryRepository.js";

export const getAllCategories = async (req, res) => {
  const categories = await categoryRepository.getAllCategories();

  res.render("category/index", {
    categories,
  });
};

export default { getAllCategories };
