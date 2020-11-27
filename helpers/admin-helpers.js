const { ObjectID } = require("mongodb");
const db = require("../config/dbConfig");
const collections = require("../config/collections");

module.exports = {
  findAdmin: () => {
    return new Promise(async (resolve, reject) => {
      const admin = await db
        .getDb()
        .collection(collections.ADMIN_COLLECTION)
        .find()
        .toArray();
      console.log(admin);
      if (admin.length == 0) {
        reject();
      } else {
        resolve();
      }
    });
  },
  signup: (data) => {
    return new Promise(async (resolve, reject) => {
      const admin = await db
        .getDb()
        .collection(collections.ADMIN_COLLECTION)
        .find()
        .toArray();
      if (admin.length == 0) {
        db.getDb()
          .collection(collections.ADMIN_COLLECTION)
          .insertOne(data)
          .then(() => resolve());
      } else {
        reject({ message: "Admin already Exists!!" });
      }
    });
  },
  login: (data) => {
    return new Promise(async (resolve, reject) => {
      const selectedUser = await db
        .getDb()
        .collection("admin")
        .findOne({ email: data.email });
      if (selectedUser) {
        console.log(selectedUser);
        if (selectedUser.password === data.password) {
          resolve();
        } else {
          reject({ message: "Incorrect password" });
        }
      } else {
        reject({ message: "User not found" });
      }
    });
  },
};
