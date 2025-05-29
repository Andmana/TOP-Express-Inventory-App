import productRepository from "../repositories/productRepository.js";
import categoryRepository from "../repositories/categoryRepository.js";

const getAllProducts = async (req, res, next) => {
  const products = await productRepository.getAllProducts();
  const categories = await categoryRepository.getAllCategories();
  res.render("product/index", { products, categories });
};

export default { getAllProducts };
