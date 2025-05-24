/**
 * Home Controller
 * Handles requests to the home page.
 */

const index = async (req, res) => {
  res.render("home/index");
};

export default { index };
