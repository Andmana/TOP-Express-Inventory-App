import colors from "colors";
import path from "path";

const METHOD_COLORS = {
  GET: "green",
  POST: "yellow",
  PUT: "blue",
  DELETE: "red", // Fixed the color for DELETE to "red" instead of "orange"
};

// Logger middleware
const loggerMiddleware = (req, res, next) => {
  // Exclude static files request
  const staticFileExt = path.extname(req.originalUrl);
  if (staticFileExt != "") return next();

  const color = METHOD_COLORS[req.method] || "white";
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`[
      color
    ]
  );
  next();
};

export default loggerMiddleware;
