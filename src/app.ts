import path from "path";
import express, { Request, Response, json } from "express";
import createError from "http-errors";
import logger from "morgan";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import session from "express-session";
import fileUpload from "express-fileupload";
import passport from "passport";
import flash from "express-flash";
import connectMongo from "connect-mongo";

import "./config/dbConfig";
import { passportConfig } from "./config/passportConfig";
import { userRouter, appRouter } from "./routes";

const MongoStore = connectMongo(session);

const app = express();
dotenv.config();

// view engine setup
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: path.join(__dirname, "..", "views", "layouts"),
    partialsDir: path.join(__dirname, "..", "views", "partials"),
  })
);

// Passport initialize
passportConfig(passport);

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(
  session({
    secret: process.env.SESSION_SECTRET || "jibbrish",
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

app.use(appRouter);
app.use("/", userRouter);

// catch 404 and forward to error handler
app.use(function (_, _a, next) {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export { app };
