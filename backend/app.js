const express = require("express");
const app = express();
const cors = require("cors");

const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const { database } = require("./config/db");
const apiRouter = express.Router();

const archivesRoute = require("./routes/archives/ArchiveAPI");



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "https://localhost:5173",
  })
);

app.set("views", path.join(__dirname, "views"));  
app.set("view engine", "ejs");

const port = process.env.PORT || 3000;

database();


app.use("/api/v1", apiRouter);

apiRouter.use("/archives", archivesRoute)



app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});

module.exports = app;
