import { name } from "ejs";
import categoryRepository from "../repositories/categoryRepository.js";

/**
 * @desc  GET all categories
 * @route GET /categories
 */
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryRepository.getAllCategories();
    res.render("category/index", {
      categories,
    });
  } catch (error) {
    next(new Error("Internal server error"));
  }
};

/**
 * @desc  GET create categories form view
 * @route GET /categories/create
 */
const getCreate = async (req, res, next) => {
  try {
    res.render("category/create", { error: null, color: null });
  } catch (error) {
    next(new Error("Internal server error"));
  }
};

// const postCreate = async (req, res, next) => {
//   const cleanName = req.body.name.trim();

//   const filepath = "/icons/uploads/categories/";

//   const newEntry = {
//     name: cleanName,
//     color: req.body.color,
//     icon: req.file
//       ? filepath + name.replaceAll(" ", "_") + ".svg"
//       : "/icons/default.svg",
//   };

//   try {
//     // Validate exists name
//     const isNameExists = await categoryRepository.isNameExists(cleanName);
//     if (isNameExists) {
//       const err = new Error();
//       err.name = "Name Already exists";
//       throw err;
//     }
//     console.log(req.body);
//     if (req.file) console.log(req.file.filename);

//     res.render("category/");
//   } catch (error) {
//     res.render("category/create", { error });
//   }
// };

const postCreate = async (req, res, next) => {
  const { name, color } = req.body;

  if (!name?.trim())
    return res.render("category/create", {
      error: { name: "Category name is required" },
      color,
    });

  const cleanName = name.trim();

  try {
    // Validate exists name
    const isNameExists = await categoryRepository.isNameExists(cleanName);
    if (isNameExists)
      return res.render("category/create", {
        error: { name: "Category name is already exists" },
        color,
      });

    let icon_src = "/icons/default.svg";
    if (req.file) {
      icon_src =
        "/icons/uploads/categories/" + name.replaceAll(" ", "_") + ".svg";
    }

    // Db query
    const newEntry = { name: cleanName, color, icon_src };
    await categoryRepository.createCategory(newEntry);

    // Redirect
    console.log("came here");
    return res.redirect("/categories");
  } catch (error) {
    return next(error);
  }
};

export default { getAllCategories, getCreate, postCreate };
