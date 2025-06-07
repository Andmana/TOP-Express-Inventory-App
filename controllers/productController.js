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

/**
 * @desc  GET products by id product
 * @route GET /products/:id
 */
const getProductById = async (req, res, next) => {
  const productId = req.params.id;

  try {
    // Fetch data
    const product = await productRepository.getProductById(productId);
    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      return next(err);
    }

    // Render the view
    res.render("product/detail", { product, getContrastColor });
  } catch (error) {
    return next(new Error(error.message || "Internal server error"));
  }
};

/**
 * @desc  GET  create products form view
 * @route GET /products/create
 */
const getCreate = async (req, res, next) => {
  try {
    const categories = await categoryRepository.getAllCategories();
    res.render("product/create", { categories });
  } catch (error) {
    next(new Error("Internal server error"));
  }
};

const postCreate = async (req, res, next) => {
  const { name, category_id, price, quantity, brand, description } = req.body;
  try {
    const categories = await categoryRepository.getAllCategories();
    const isNameExists = await productRepository.isNameExists(name.trim());
    if (isNameExists) {
      return res.render("product/create", {
        error: { name: "Product name is already exists" },
        categories,
      });
    }

    let icon_src = "/icons/default.svg";
    if (req.file) {
      icon_src = `/uploads/${req.file.filename}`;
    }

    // Db query
    const newEntry = {
      name: name.trim(),
      category_id,
      description,
      quantity,
      price,
      brand,
      icon_src,
    };
    await productRepository.createProduct(newEntry);
    // Redirect
    return res.redirect("/products");
  } catch (error) {
    return next(error);
  }
};

/**
 * @desc  DELETE  delete product by id
 * @route DELETE /products/:id
 */
const deleteProductById = async (req, res, next) => {
  const productId = req.body.id;

  try {
    const product = await productRepository.getProductById(productId);
    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      return next(err);
    }

    const isDeleted = await productRepository.deleteProductById(product.id);
    if (!isDeleted) {
      const err = new Error("System error");
      err.status = 500;
      return next(err);
    }

    return res.redirect("/products");
  } catch (error) {
    const err = new Error(error.message || "Invalid system");
    err.status = 501;
    return next(err);
  }
};

/**
 * @desc  GET products edit form
 * @route GET /products/edit/:id
 */
const getEditProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    // Fetch data
    const [product, categories] = await Promise.all([
      productRepository.getProductById(productId),
      categoryRepository.getAllCategories(),
    ]);

    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      return next(err);
    }

    // Render the view
    res.render("product/edit", { product, categories });
  } catch (error) {
    return next(new Error(error.message || "Internal server error"));
  }
};

export default {
  getAllProducts,
  getProductById,
  getCreate,
  postCreate,
  deleteProductById,
  getEditProduct,
};
