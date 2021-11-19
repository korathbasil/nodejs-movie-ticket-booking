const localStrategy = require("passport-local").Strategy;

import theatreServices from "services/theatreService";
import adminServices from "../services/adminService";

export default (passport: any) => {
  const authenticateAdmin = (email: string, password: string, done: any) => {
    adminServices
      .login({ email: email, password: password })
      .then((user) => done(null, user))
      .catch((e) => done(null, false, { message: e.message }));
  };
  const authenticateOwner = (username: string, password: string, done: any) => {
    theatreServices
      .login({ username: username, password: password })
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
    if (await adminServices.getAdminById(id)) {
      done(null, adminServices.getAdminById(id));
    } else if (await theatreServices.getOwnerById(id)) {
      done(null, theatreServices.getOwnerById(id));
    } else {
      console.log("User");
    }
  });
};
