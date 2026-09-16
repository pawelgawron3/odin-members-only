import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { db } from "../db/queries.js";
import { comparePassword } from "../utils/password.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserByUsername(username);

      if (!user) {
        return done(null, false);
      }

      const isValid = await comparePassword(password, user.password);

      if (!isValid) {
        return done(null, false);
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
