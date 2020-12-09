const bcrypt = require("bcrypt");

const db = require("../config/dbConfig");
const collections = require("../config/collections");
const { ObjectID } = require("mongodb");

module.exports = {
  getOwnerById: (id) => {
    return db
      .getDb()
      .collection(collections.OWNERS_COLLECTION)
      .findOne({ _id: ObjectID(id) });
  },
  login: (data) => {
    return new Promise(async (resolve, reject) => {
      const selectedUser = await db
        .getDb()
        .collection(collections.OWNERS_COLLECTION)
        .findOne({ username: data.username });
      if (selectedUser) {
        console.log("user found");
        isPasswordTrue = await bcrypt.compare(
          data.password,
          selectedUser.password
        );
        if (isPasswordTrue) {
          resolve(selectedUser);
        } else {
          reject({ message: "Incorrect Password" });
        }
      } else {
        reject({ message: "User not fonud" });
      }
    });
  },
  addMovie: (movieDetails) => {
    return new Promise((resolve, reject) => {});
  },
};
