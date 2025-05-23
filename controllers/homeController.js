const index = async (req, res) => {
  res.render("home/index", { activeNav: "home" });
};

export default { index };
