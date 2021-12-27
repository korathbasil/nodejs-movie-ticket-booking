import { InsertOneResult } from "mongodb";

import { passwordHelpers } from "../helpers";
import { getCollection } from "../config/dbConfig";
import { User } from "../models/userModel";

export class UserService {
  public static async signup(userDetails: {
    name: string;
    email: string;
    password: string;
  }): Promise<InsertOneResult<User>> {
    const userCollection = getCollection<User>("users")!;

    userDetails.password = await passwordHelpers.hashPassword(
      userDetails.password
    );

    return userCollection.insertOne(userDetails);
  }

  public static async login(userCredentials: {
    email: string;
    password: string;
  }) {
    const userCollection = getCollection<User>("users")!;

    const selectedUSer = await userCollection.findOne({
      email: userCredentials.email,
    });

    if (!selectedUSer) return;

    return passwordHelpers.comparePassword(
      userCredentials.password,
      selectedUSer.password
    );
  }
}

// sendSignupOtp: (otp: any, email: any, cb: any) => {
//   // Configure Nodemailer
//   const nodemailer = require("nodemailer");
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.GMAIL_ID,
//       pass: process.env.GMAIL_PASSWORD,
//     },
//   });
//   const mailBody = `<body style="font: 14px 'Lucida Grande', Helvetica, Arial, sans-serif">
//         <div
//           style="
//             width: 100%;
//             max-width: 700px;
//             margin: 0 auto;
//             box-shadow: 3px 3px 3px lightgrey;
//             padding: 20px;
//           "
//         >
//           <div style="width: 100%">
//             <h1
//               style="
//                 margin-left: 20px;
//                 margin-top: 20px;
//                 margin-bottom: 20px;
//                 font-size: 40px;
//                 color: #2f3547;
//               "
//             >
//               CineMax
//             </h1>
//           </div>
//           <div
//             style="width: 100%; padding-left: 20px; padding-right: 20px"
//           >
//             <p style="margin-bottom: 30px">
//               Your OTP is given below
//             </p>
//             <p>Your login credentials are given below</p>
//             <div
//               style="
//                 width: 100%;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//               "
//             >
//               <div
//                 style="
//                   width: fit-content;
//                   padding: 30px;
//                   border-radius: 20px;
//                   background-color: lightgrey;
//                 "
//               >
//                 <p>OTP  :   <strong>${otp}</strong></p>
//               </div>
//             </div>
//             <p>To login click <a href="">here</a></p>
//           </div>
//           <div class="footer" style="text-align: center">
//             <p style="margin-bottom: 10px">CIneMax ©</p>
//           </div>
//         </div>
//       </body>
//       `;
//   transporter
//     .sendMail({
//       from: process.env.GMAIL_ID,
//       to: email,
//       subject: "OTP - CineMax",
//       html: mailBody,
//     })
//     .then(() => cb())
//     .catch((e: any) => cb(e));
// },
// verifySignupOtp: (userId: any, otp: any) => {
//   return new Promise(async (resolve, reject) => {
//     const selectedUSer = await getCollection(collections.USER_COLLECTION)?
//       .findOne({ _id: ObjectID(userId) })
//     if (!selectedUSer) {
//       reject({ message: "Incorrect OTP" });
//     } else {
//       if (otp == selectedUSer.otp) {
//         resolve(selectedUSer);
//       } else {
//         reject({ message: "IncorrectOTP" });
//       }
//     }
//   });
// },
// sendLoginOtp: (email:string, otp: number, cb: any) => {
//   // Configure Nodemailer
//   const nodemailer = require("nodemailer");
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.GMAIL_ID,
//       pass: process.env.GMAIL_PASSWORD,
//     },
//   });
//   const mailBody = `<body style="font: 14px 'Lucida Grande', Helvetica, Arial, sans-serif">
//       <div
//         style="
//           width: 100%;
//           max-width: 700px;
//           margin: 0 auto;
//           box-shadow: 3px 3px 3px lightgrey;
//           padding: 20px;
//         "
//       >
//         <div style="width: 100%">
//           <h1
//             style="
//               margin-left: 20px;
//               margin-top: 20px;
//               margin-bottom: 20px;
//               font-size: 40px;
//               color: #2f3547;
//             "
//           >
//             CineMax
//           </h1>
//         </div>
//         <div
//           style="width: 100%; padding-left: 20px; padding-right: 20px"
//         >
//           <p style="margin-bottom: 30px">
//             Your OTP is given below
//           </p>
//           <p>Your login credentials are given below</p>
//           <div
//             style="
//               width: 100%;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//             "
//           >
//             <div
//               style="
//                 width: fit-content;
//                 padding: 30px;
//                 border-radius: 20px;
//                 background-color: lightgrey;
//               "
//             >
//               <p>OTP  :   <strong>${otp}</strong></p>
//             </div>
//           </div>
//           <p>To login click <a href="">here</a></p>
//         </div>
//         <div class="footer" style="text-align: center">
//           <p style="margin-bottom: 10px">CIneMax ©</p>
//         </div>
//       </div>
//     </body>
//     `;
//   transporter
//     .sendMail({
//       from: process.env.GMAIL_ID,
//       to: email,
//       subject: "OTP - CineMax",
//       html: mailBody,
//     })
//     .then(() => cb())
//     .catch((e) => cb(e));
// },
// updateLoginOtp: (userId, otp) => {
//   return new Promise((resolve, reject) => {
//     db.getDb()
//       .collection(collections.USER_COLLECTION)
//       .updateOne(
//         { _id: ObjectID(userId) },
//         {
//           $set: { otp: otp },
//         }
//       )
//       .then(() => resolve());
//   });
// },
// verifyLoginOtp: (userId, otp) => {
//   return new Promise(async (resolve, reject) => {
//     const selectedUser = await getCollection(collections.USER_COLLECTION)?
//       .findOne({ _id: ObjectID(userId) });
//     if (selectedUser.otp == otp) {
//       resolve(selectedUser);
//     } else {
//       reject({ message: "incorrect OTP" });
//     }
//   });
// },
// generateOrderRazorpay: () => {
//   return new Promise((resolve) => {
//     const instance = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });
//     let options = {
//       amount: 1000,
//       currency: "INR",
//       receipt: "order_rcptid_11",
//     };
//     instance.orders.create(options, function (_, order: any) {
//       resolve(order);
//     });
//   });
// },
