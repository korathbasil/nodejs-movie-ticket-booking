const db = require("../config/dbConfig");
const collections = require("../config/collections");
const { ObjectID } = require("mongodb");

const Razorpay = require("razorpay");
const bcrypt = require("bcrypt");

module.exports = {
  signup: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.password = await bcrypt.hash(userData.password, 10);
      db.getDb()
        .collection(collections.USER_COLLECTION)
        .insertOne(userData)
        .then((data) => {
          resolve(data.ops[0]._id);
        });
    });
  },
  verifySignupOtp: (userId, otp) => {
    return new Promise(async (resolve, reject) => {
      const selectedUSer = await db
        .getDb()
        .collection(collections.USER_COLLECTION)
        .findOne({ _id: ObjectID(userId) });
      if (!selectedUSer) {
        reject({ message: "Incorrect OTP" });
      } else {
        if (otp == selectedUSer.otp) {
          resolve(selectedUSer);
        } else {
          reject({ message: "IncorrectOTP" });
        }
      }
    });
  },
  login: (userData) => {
    return new Promise(async (resolve, reject) => {
      const selectedUSer = await db
        .getDb()
        .collection(collections.USER_COLLECTION)
        .findOne({ email: userData.email });
      if (!selectedUSer) {
        reject({ message: "User not found" });
      } else {
        const isPasswordTrue = await bcrypt.compare(
          selectedUSer.password,
          userData.password
        );
        if (isPasswordTrue) {
          resolve(selectedUSer);
        } else {
          reject({ message: "Incorrect password" });
        }
      }
    });
  },
  verifyLoginOtp: (userId, otp) => {
    return new Promise(async (resolve, reject) => {
      const selectedUser = await db
        .getDb()
        .collection(collections.USER_COLLECTION)
        .findOne({ _id: ObjectID(userId) });
      if (selectedUser.otp == otp) {
        resolve(user);
      } else {
        reject({ message: "incorrect OTP" });
      }
    });
  },
  getAllMovies: () => {
    return new Promise(async (resolve, reject) => {
      const movies = await db
        .getDb()
        .collection(collections.MOVIE_COLLECTION)
        .find()
        .toArray();
      resolve(movies);
    });
  },
  getMovieById: (movieId) => {
    return new Promise(async (resolve, reject) => {
      const movie = await db
        .getDb()
        .collection(collections.OWNERS_COLLECTION)
        .aggregate([
          { $match: { _id: ObjectID(movieId) } },
          {
            $lookup: {
              from: collections.SHOW_COLLECTION,
              foreignField: "movie",
              localField: "_id",
              as: "shows",
            },
          },
        ])
        .toArray();
      console.log(movie);
    });
  },
  payRazorpay: () => {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    let options = {
      amount: 1000,
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    instance.orders.create(options, function (err, order) {
      console.log(order);
    });
  },
};
