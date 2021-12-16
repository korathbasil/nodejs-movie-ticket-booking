const createError = require("http-errors");
import "./config/dbConfig";

import express, { Request, Response } from "express";
import path from "path";
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const hbs = require("express-handlebars");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const passport = require("passport");
const flash = require("express-flash");
const MongoStore = require("connect-mongo")(session);

// Router imports
// const theaterRoute = require("./routes/theater");

const app = express();
dotenv.config();

// view engine setup
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: path.join(__dirname, "..", "views", "layouts"),
    partialsDir: path.join(__dirname, "..", "views", "partials"),
  })
);
// DB connect

// Passport initialize
// const passportConfig = require("./config/passportConfig");
import { passportConfig } from "./config/passportConfig";
passportConfig(passport);

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(
  session({
    secret: process.env.SESSION_SECTRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 16000000 },
    store: new MongoStore({
      url: "mongodb://localhost:27017/MovieTicketBooking",
    }),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// import { connectToDatabase } from "./config/dbConfig";

// async function startDb() {
//   await connectToDatabase();
// }
// startDb();
import { AdminRouter, UserRouter } from "./routes";

app.use("/", UserRouter);
app.use("/admin", AdminRouter);
// app.use("/theater", theaterRoute);
// app.post("/test");

// catch 404 and forward to error handler
app.use(function (_, _a, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
