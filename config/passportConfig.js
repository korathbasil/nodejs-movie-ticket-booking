const localStrategy = require("passport-local").Strategy;

const { ObjectID } = require("mongodb");
const theaterHelpers = require("../helpers/theater-helpers");
const db = require("./dbConfig");

module.exports = (passport) => {
  const authenticateUser = (username, password, done) => {
    theaterHelpers
      .login({ username: username, password: password })
      .then((user) => {
        console.log(user);
        done(null, user);
      })
      .catch((e) => {
        console.log(e);
        done(null, false, { messge: e.message });
      });
  };
  const getUserByID = (id) => {
    return db
      .getDb()
      .collection("owners")
      .findOne({ _id: ObjectID(id) });
  };
  passport.use(new localStrategy(authenticateUser));
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((id, done) => done(null, getUserByID(id)));
};
