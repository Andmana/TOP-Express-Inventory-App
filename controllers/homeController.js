/**
 * Home Controller
 * Handles requests to the home page.
 */

const index = async (req, res, next) => {
  try {
    res.render("home/index");
  } catch (error) {
    console.log("Fail to render");
    const err = new Error("Internal server error");
    return next(err);
  }
};

export default { index };
