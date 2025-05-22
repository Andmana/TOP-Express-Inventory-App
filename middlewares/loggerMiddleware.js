import colors from "colors";

const METHOD_COLORS = {
  GET: "green",
  POST: "yellow",
  PUT: "blue",
  DELETE: "red", // Fixed the color for DELETE to "red" instead of "orange"
};

// Logger middleware
const loggerMiddleware = (req, res, next) => {
  const color = METHOD_COLORS[req.method] || "white";
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`[
      color
    ]
  );
  next();
};

export default loggerMiddleware;
