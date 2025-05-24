import "dotenv/config";
import colors from "colors";
import express from "express";
import url from "url";
import path from "path";

import loggerMiddleware from "./middlewares/loggerMiddleware.js";
import errorMiddleware, {
  errorNotFound,
} from "./middlewares/errorMiddleware.js";

import homeRouter from "./routes/homeRoute.js";
import categoryRouter from "./routes/categoryRoute.js";

const PORT = process.env.PORT || 8000;
const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Setup form req
app.use(express.urlencoded({ extended: true }));
// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(loggerMiddleware); // Logger
app.use(errorMiddleware); // Errorhandle

// Routes
app.use("/", homeRouter);
app.use("/categories", categoryRouter); // Categories Routes

// Error handle
app.use(errorNotFound); // error route not found
app.use(errorMiddleware); // error render handle

//
app.listen(PORT, () => {
  console.log(
    `Server ruin on port ${PORT} --> ` + `http://localhost:${PORT}`["blue"]
  );
});
