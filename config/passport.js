import passport from "passport";
import { db } from "../db/queries.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUser(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});
