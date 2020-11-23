const { ObjectID } = require("mongodb");
const db = require("../config/dbConfig");

module.exports = {
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
