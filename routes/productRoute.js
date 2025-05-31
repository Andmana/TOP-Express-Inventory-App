import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/create", productController.getCreate);
router.get("/:id", productController.getProductById);

export default router;
