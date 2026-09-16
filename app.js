import "dotenv/config";
import express from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./db/pool.js";
import homeRouter from "./routes/homeRouter.js";

const pgSession = connectPgSimple(session);

const app = express();

const PORT = process.env.PORT || 8080;

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(
  session({
    store: new pgSession({ pool, createTableIfMissing: true }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.get("/", homeRouter);

app.listen(PORT, (err) => {
  if (err) throw err;

  console.log(`Server is listening for requests on port ${PORT}`);
});
