const bcrypt = require("bcrypt");
const db = require("../config/dbConfig");
const collections = require("../config/collections");
const { ObjectID } = require("mongodb");

module.exports = {
  findAdmin: () => {
    // Checking if an Admin already exists
    return new Promise(async (resolve, reject) => {
      const admin = await db
        .getDb()
        .collection(collections.ADMIN_COLLECTION)
        .find()
        .toArray();
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
          reject({ message: "Incorrect Password" });
        }
      } else {
        reject({ message: "User Not Found" });
      }
    });
  },
  getAllTheterOwners: () => {
    return new Promise(async (resolve, reject) => {
      const owners = await db
        .getDb()
        .collection(collections.OWNERS_COLLECTION)
        .find()
        .toArray();
      resolve(owners);
    });
  },
  sendAddTheaterOwnerMail: (recieverId, username, password, cb) => {
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
                Welcome to CineMax Family. Your account has successfully registered as a
                theater owner in CineMax. We are very happy to get you onboard. Let's
                grow together!!
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
                  <p>Username  :   <strong>${username}</strong></p>
                  <p>Password  :   <strong>${password}</strong></p>
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
        to: recieverId,
        subject: "Theater Owner Account Added - CineMax",
        html: mailBody,
      })
      .then(() => cb())
      .catch((e) => cb(e));
  },
  addTheaterOwner: (ownerData) => {
    return new Promise(async (resolve, reject) => {
      const password = ownerData.password;
      const hashedPassword = await bcrypt.hash(ownerData.password, 10);
      ownerData.password = hashedPassword;
      db.getDb()
        .collection(collections.OWNERS_COLLECTION)
        .insertOne(ownerData)
        .then(() => resolve())
        .catch(() => reject());
    });
  },
  getTheaterOwner: (ownerId) => {
    return new Promise((resolve, reject) => {
      db.getDb()
        .collection(collections.OWNERS_COLLECTION)
        .findOne({ _id: ObjectID(ownerId) })
        .then((owner) => {
          resolve(owner);
        });
    });
  },
  editTheaterOwner: (newData, ownerId) => {
    return new Promise((resolve, reject) => {
      db.getDb()
        .collection(collections.OWNERS_COLLECTION)
        .updateOne(
          { _id: ObjectID(ownerId) },
          {
            $set: newData,
          }
        )
        .then(() => resolve())
        .catch(() => reject());
    });
  },
  deleteTheaterOwner: (ownerId) => {
    return new Promise((resolve, reject) => {
      db.getDb()
        .collection(collections.OWNERS_COLLECTION)
        .deleteOne({ _id: ObjectID(ownerId) })
        .then(() => resolve())
        .catch(() => reject());
    });
  },
};
