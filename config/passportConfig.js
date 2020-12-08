const localStrategy = require("passport-local").Strategy;

const theaterHelpers = require("../helpers/theater-helpers");
const adminHelpers = require("../helpers/admin-helpers");

module.exports = (passport) => {
  const authenticateAdmin = (email, password, done) => {
    adminHelpers
      .login({ email: email, password: password })
      .then((user) => done(null, user))
      .catch((e) => done(null, false, { message: e.message }));
  };
  const authenticateOwner = (username, password, done) => {
    theaterHelpers
      .login({ username: username, password: password })
      .then((user) => {
        done(null, user);
      })
      .catch((e) => {
        done(null, false, { messge: e.message });
      });
  };
  passport.use(
    "admin-local",
    new localStrategy({ usernameField: "email" }, authenticateAdmin)
  );
  passport.use("owner-local", new localStrategy(authenticateOwner));
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((user, done) => {
    if (user.type === "admin") {
      done(null, adminHelpers.getAdminById(user._id));
    } else if (user.type === "owner") {
      done(null, theaterHelpers.getOwnerById(user._id));
    } else {
      console.log("User");
    }
  });
};
