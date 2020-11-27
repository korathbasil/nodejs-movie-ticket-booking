const { ObjectID } = require("mongodb");
const bcrypt = require("bcrypt");
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
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newAdmin = {
          email: data.email,
          password: hashedPassword,
        };
        db.getDb()
          .collection(collections.ADMIN_COLLECTION)
          .insertOne(newAdmin)
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
        isPasswordTrue = await bcrypt.compare(
          data.password,
          selectedUser.password
        );
        if (isPasswordTrue) {
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
