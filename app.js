import "dotenv/config";
import "./config/passport.js";
import express from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import pool from "./db/pool.js";
import homeRouter from "./routes/homeRouter.js";
import authRouter from "./routes/authRouter.js";
import messagesRouter from "./routes/messagesRouter.js";

const pgSession = connectPgSimple(session);

const app = express();

const PORT = process.env.PORT || 8080;

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(
  session({
    store: new pgSession({
      pool,
      tableName: "sessions",
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req?.user;
  next();
});

app.use("/", homeRouter);
app.use("/auth", authRouter);
app.use("/messages", messagesRouter);

app.listen(PORT, (err) => {
  if (err) throw err;

  console.log(`Server is listening for requests on port ${PORT}`);
});
