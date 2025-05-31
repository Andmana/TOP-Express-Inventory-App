import multer from "multer";
import path from "path";

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

const uploadMiddleware = multer({ storage: storage });

export default uploadMiddleware;
