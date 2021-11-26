import { Collection, ObjectId } from "mongodb";

import { Users } from "../models";
import { passwordHelpers } from "../helpers";

const collections = require("../config/collections");
const { ObjectID } = require("mongodb");
const Razorpay = require("razorpay");
const bcrypt = require("bcrypt");

import { getCollection } from "config/dbConfig";

export default {
  signup: (userDetails: { name: string; email: string; password: string }) => {
    return new Promise<ObjectId>(async (resolve, reject) => {
      userDetails.password = await passwordHelpers.hashPassword(
        userDetails.password
      );

      Users?.insertOne(userDetails)
        .then((data) => {
          resolve(data.insertedId);
        })
        .catch(() => reject(new Error("Operation failed")));
    });
  },

  sendSignupOtp: (otp: any, email: any, cb: any) => {
    // Configure Nodemailer
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    const mailBody = `<body style="font: 14px 'Lucida Grande', Helvetica, Arial, sans-serif">
          <div
            style="
              width: 100%;
              max-width: 700px;
              margin: 0 auto;
              box-shadow: 3px 3px 3px lightgrey;
              padding: 20px;
            "
          >
            <div style="width: 100%">
              <h1
                style="
                  margin-left: 20px;
                  margin-top: 20px;
                  margin-bottom: 20px;
                  font-size: 40px;
                  color: #2f3547;
                "
              >
                CineMax
              </h1>
            </div>
            <div
              style="width: 100%; padding-left: 20px; padding-right: 20px"
            >
              <p style="margin-bottom: 30px">
                Your OTP is given below
              </p>
              <p>Your login credentials are given below</p>
              <div
                style="
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <div
                  style="
                    width: fit-content;
                    padding: 30px;
                    border-radius: 20px;
                    background-color: lightgrey;
                  "
                >
                  <p>OTP  :   <strong>${otp}</strong></p>
                </div>
              </div>

              <p>To login click <a href="">here</a></p>
            </div>
            <div class="footer" style="text-align: center">
              <p style="margin-bottom: 10px">CIneMax ©</p>
            </div>
          </div>
        </body>
        `;
    transporter
      .sendMail({
        from: process.env.GMAIL_ID,
        to: email,
        subject: "OTP - CineMax",
        html: mailBody,
      })
      .then(() => cb())
      .catch((e: any) => cb(e));
  },
  verifySignupOtp: (userId: any, otp: any) => {
    return new Promise(async (resolve, reject) => {
      const selectedUSer = await getCollection(collections.USER_COLLECTION)?
        .findOne({ _id: ObjectID(userId) })
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
      const selectedUSer = await getCollection(Collections.USER_COLLECTION)?
        .findOne({ email: userData.email });
      if (!selectedUSer) {
        reject({ message: "User not found" });
      } else {
        const isPasswordTrue = await bcrypt.compare(
          userData.password,
          selectedUSer.password
        );
        if (isPasswordTrue) {
          resolve(selectedUSer);
        } else {
          reject({ message: "Incorrect password" });
        }
      }
    });
  },
  sendLoginOtp: (email:string, otp, cb) => {
    // Configure Nodemailer
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    const mailBody = `<body style="font: 14px 'Lucida Grande', Helvetica, Arial, sans-serif">
        <div
          style="
            width: 100%;
            max-width: 700px;
            margin: 0 auto;
            box-shadow: 3px 3px 3px lightgrey;
            padding: 20px;
          "
        >
          <div style="width: 100%">
            <h1
              style="
                margin-left: 20px;
                margin-top: 20px;
                margin-bottom: 20px;
                font-size: 40px;
                color: #2f3547;
              "
            >
              CineMax
            </h1>
          </div>
          <div
            style="width: 100%; padding-left: 20px; padding-right: 20px"
          >
            <p style="margin-bottom: 30px">
              Your OTP is given below
            </p>
            <p>Your login credentials are given below</p>
            <div
              style="
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <div
                style="
                  width: fit-content;
                  padding: 30px;
                  border-radius: 20px;
                  background-color: lightgrey;
                "
              >
                <p>OTP  :   <strong>${otp}</strong></p>
              </div>
            </div>

            <p>To login click <a href="">here</a></p>
          </div>
          <div class="footer" style="text-align: center">
            <p style="margin-bottom: 10px">CIneMax ©</p>
          </div>
        </div>
      </body>
      `;
    transporter
      .sendMail({
        from: process.env.GMAIL_ID,
        to: email,
        subject: "OTP - CineMax",
        html: mailBody,
      })
      .then(() => cb())
      .catch((e) => cb(e));
  },
  updateLoginOtp: (userId, otp) => {
    return new Promise((resolve, reject) => {
      db.getDb()
        .collection(collections.USER_COLLECTION)
        .updateOne(
          { _id: ObjectID(userId) },
          {
            $set: { otp: otp },
          }
        )
        .then(() => resolve());
    });
  },
  verifyLoginOtp: (userId, otp) => {
    return new Promise(async (resolve, reject) => {
      const selectedUser = await getCollection(collections.USER_COLLECTION)?
        .findOne({ _id: ObjectID(userId) });
      if (selectedUser.otp == otp) {
        resolve(selectedUser);
      } else {
        reject({ message: "incorrect OTP" });
      }
    });
  },
  getAllMovies: () => {
    return new Promise(async (resolve, reject) => {
      const scheduledMovies = await db
        .getDb()
        .collection(collections.SHOW_COLLECTION)
        .aggregate([
          {
            $lookup: {
              from: collections.MOVIE_COLLECTION,
              foreignField: "_id",
              localField: "movie",
              as: "movie",
            },
          },
          { $unwind: "$movie" },
          { $group: { _id: "$movie" } },
        ])
        .toArray();
      resolve(scheduledMovies);
    });
  },
  getMovieShowsById: (movieId) => {
    return new Promise(async (resolve, reject) => {
      const theaters = await db
        .getDb()
        .collection(collections.OWNERS_COLLECTION)
        .aggregate([
          {
            $lookup: {
              from: collections.SCREEN_COLLECTION,
              foreignField: "_id",
              localField: "screens",
              as: "screens",
            },
          },
          { $unwind: "$screens" },

          {
            $lookup: {
              from: collections.SHOW_COLLECTION,
              foreignField: "_id",
              localField: "screens.shows",
              as: "screens.shows",
              // let: { movie: "screen.shows.movie" },
              // pipeline: [{ $match: { movie: ObjectID(movieId) } }],
            },
          },
          {
            $group: {
              _id: {
                _id: "$_id",
                name: "$name",
              },
              // shows: { $push: "$screens.shows" },
              screens: { $push: "$screens" },
            },
          },
          {
            $unwind: {
              path: "$screens.shows",
            },
          },

          {
            $match: {
              "screens.shows.movie": ObjectID(movieId),
            },
          },

          // {
          //   $lookup: {
          //     from: collections.MOVIE_COLLECTION,
          //     let: { movie: ObjectID(movieId) },
          //     pipeline: [
          //       {
          //         $match: {
          //           $expr: {
          //             $eq: ["$_id", "$movie"],
          //           },
          //         },
          //       },
          //     ],
          //     as: "screens.shows.movie",
          //   },
          // },
          // { $match: { screen } },

          // {
          //   $lookup: {
          //     from: collections.MOVIE_COLLECTION,
          //     foreignField: "_id",
          //     localField: "screens.shows.movie",
          //     as: "screens.shows.movie",
          //   },
          // },
          // { $unwind: "$screens.shows.movie" },
          // { $project: { theater: 1, screens: 1 } },
          // {
          //   $group: {
          //     _id: {
          //       _id: "$_id",
          //       name: "$name",
          //     },
          //     screens: {
          //       $group: {
          //         _id: "$screens._id",
          //       },
          //     },
          //     // screens$shows: { $push: "$screens.shows" },
          //   },
          // },
        ])
        .toArray();
      console.log(theaters[0].screens);
      resolve(theaters);
      // console.log(JSON.stringify(movie, null, 4));
    });
  },
  getAllShows: (movieId) => {
    return new Promise(async (resolve, reject) => {
      const shows = await db
        .getDb()
        .collection(collections.SHOW_COLLECTION)
        .aggregate([
          {
            $lookup: {
              from: collections.MOVIE_COLLECTION,
              localField: "movie",
              foreignField: "_id",
              as: "movie",
            },
          },
          { $unwind: "$movie" },
          { $match: { "movie._id": ObjectID(movieId) } },
        ])
        .toArray();
      resolve(shows);
      // console.log(shows);
    });
  },
  getShowById: (showId: any) => {
    return new Promise((resolve) => {
      db.getDb()
        .collection(collections.SHOW_COLLECTION)
        .findOne({ _id: ObjectID(showId) })
        .then((show: any) => {
          resolve(show);
        });
    });
  },
  generateOrderRazorpay: () => {
    return new Promise((resolve) => {
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      let options = {
        amount: 1000,
        currency: "INR",
        receipt: "order_rcptid_11",
      };
      instance.orders.create(options, function (_, order: any) {
        resolve(order);
      });
    });
  },
};
