import express from "express";
import categoryController from "../controllers/categoryController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "public/icons/uploads/categories/" });

router.get("/", categoryController.getAllCategories);
router.get("/create", categoryController.getCreate);
router.post("/create", upload.single("icon"), categoryController.postCreate);

export default router;
