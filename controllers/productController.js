import productRepository from "../repositories/productRepository.js";

const getAllProducts = async (req, res, next) => {
  const products = await productRepository.getAllProducts();
  res.render("product/index", { products });
};

export default { getAllProducts };
