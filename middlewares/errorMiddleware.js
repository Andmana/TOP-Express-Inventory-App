export const errorNotFound = (req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
};

const errorMiddleware = (err, req, res, next) => {
  res.render("error/index", { code: err.status || 500, message: err.message });
};

export default errorMiddleware;
