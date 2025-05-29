import express from "express";
import categoryController from "../controllers/categoryController.js";
import multer from "multer";
import path from "path";

const router = express.Router();
// Multer storage with .svg extension enforced
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // get extension like .svg
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + ext);
  },
});

const upload = multer({ storage: storage });

// Routes
router.get("/", categoryController.getAllCategories);
router.get("/create", categoryController.getCreate);
router.post("/create", upload.single("icon"), categoryController.postCreate);

export default router;
