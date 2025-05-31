import express from "express";
import categoryController from "../controllers/categoryController.js";
import uploadMiddleware from "../middlewares/multerMiddleware.js";

const router = express.Router();

// Routes
router.get("/", categoryController.getAllCategories);
router.get("/create", categoryController.getCreate);
router.post(
  "/create",
  uploadMiddleware.single("icon"),
  categoryController.postCreate
);

export default router;
