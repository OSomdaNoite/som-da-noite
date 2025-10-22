// import express
const express = require("express");
const app = express();
const cors = require("cors");

// libs
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const { database } = require("./config/db");

// routes imports
// rota de musicas

// app.set
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use
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

// rotas versionadas
// musicasRotas

//rotas padronizadas
// app.use("/api/v1", )

// port
const port = process.env.PORT || 3000;

database();

// view engine setup

// useMiddleware

// routes

// Server
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Escuta do server
app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});

module.exports = app;
