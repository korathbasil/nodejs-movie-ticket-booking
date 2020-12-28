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
  sendSignupOtp: (otp, email, cb) => {
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
  sendLoginOtp: (email, otp, cb) => {
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
      const selectedUser = await db
        .getDb()
        .collection(collections.USER_COLLECTION)
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
