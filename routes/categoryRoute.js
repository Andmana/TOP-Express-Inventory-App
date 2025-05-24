import express from "express";
import categoryController from "../controllers/categoryController.js";
const router = express.Router();

router.get("/", categoryController.getAllCategories);
router.get("/create", categoryController.getCreate);

export default router;
