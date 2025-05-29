const PRODUCTS = [{ name: "ice cream" }, { name: "fire" }];

const getAllProducts = async (req, res, next) => {
  res.render("product/index", { products: PRODUCTS });
};

export default { getAllProducts };
