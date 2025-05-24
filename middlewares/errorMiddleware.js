const errorMiddleware = (err, req, res, next) => {
  res.render("error/index", { code: err.status || 500, message: err.message });
};

export default errorMiddleware;
