import express from "express";
import productController from "../controllers/productController.js";
import uploadMiddleware from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/create", productController.getCreate);
router.post(
  "/create",
  uploadMiddleware.single("icon"),
  productController.postCreate
);
router.get("/:id", productController.getProductById);

export default router;
