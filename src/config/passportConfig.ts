const localStrategy = require("passport-local").Strategy;

import { AdminService, TheaterService } from "../services";

export default (passport: any) => {
  const authenticateAdmin = (email: string, password: string, done: any) => {
    AdminService.login({ email: email, password: password })
      .then((user) => done(null, user))
      .catch((e) => done(null, false, { message: e.message }));
  };
  const authenticateOwner = (username: string, password: string, done: any) => {
    TheaterService.login({ username: username, password: password })
      .then((user) => {
        done(null, user);
      })
      .catch((e) => {
        done(null, false, { message: e.message });
      });
  };
  passport.use(
    "admin-local",
    new localStrategy({ usernameField: "email" }, authenticateAdmin)
  );
  passport.use("owner-local", new localStrategy(authenticateOwner));
  passport.serializeUser((user: any, done: any) => done(null, user._id));
  passport.deserializeUser(async (id: any, done: any) => {
    if (await AdminService.getADminById(id)) {
      done(null, AdminService.getADminById(id));
    } else if (await TheaterService.getTheaterByID(id)) {
      done(null, TheaterService.getTheaterByID(id));
    } else {
      console.log("User");
    }
  });
};
