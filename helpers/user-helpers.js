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
    return new Promise((resolve, reject) => {});
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
        .collection(collections.MOVIE_COLLECTION)
        .aggregate([
          { $match: { _id: ObjectID(movieId) } },
          {
            $lookup: {
              from: collections.SHOW_COLLECTION,
              foreignField: "_id",
              localField: "shows",
              as: "shows",
            },
          },
        ]);
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
