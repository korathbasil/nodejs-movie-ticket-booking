import { ObjectId } from "mongodb";

import { getCollection } from "config/dbConfig";
import { passwordHelpers } from "helpers";
import { Theater } from "models/theaterModel";

const theaterCollection = getCollection<Theater>("theaters")!;

export class TheaterServices {
  public static async getTheaterByID(id: string): Promise<Theater | null> {
    return theaterCollection.findOne({ _id: new ObjectId(id) });
  }

  public static async login(theaterCredentials: {
    username: string;
    password: string;
  }) {
    const selectedDocument = await theaterCollection.findOne({
      username: theaterCredentials.username,
    });

    if (!selectedDocument) return;

    return passwordHelpers.comparePassword(
      theaterCredentials.password,
      selectedDocument.password
    );
  }

  public static async getAllTheaters(): Promise<Theater[]> {
    return theaterCollection.find().toArray();
  }

  public static async addTheater(theaterData: {}) {
    return theaterCollection.insertOne();
  }

  public static async getTheaterDetails() {}

  public static async editTheaterDetails() {}

  public static async deleteTheater() {}
}

export default {
  getAllTheterOwners: () => {
    return new Promise(async (resolve) => {
      const owners = await db
        .getDb()
        .collection(collections.OWNERS_COLLECTION)
        .find()
        .toArray();
      resolve(owners);
    });
  },

  sendAddTheaterOwnerMail: (
    recieverId: string,
    username: string,
    password: string,
    cb: any
  ) => {
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
      .catch((e: any) => cb(e));
  },
  addTheaterOwner: (ownerData: any) => {
    return new Promise<void>(async (resolve, reject) => {
      const hashedPassword = await hash(ownerData.password, 10);
      ownerData.password = hashedPassword;
      db.getDb()
        .collection(collections.OWNERS_COLLECTION)
        .insertOne(ownerData)
        .then(() => resolve())
        .catch(() => reject());
    });
  },
  getTheaterOwner: (ownerId: string) => {
    return new Promise((resolve) => {
      db.getDb()
        .collection(collections.OWNERS_COLLECTION)
        .findOne({ _id: ObjectID(ownerId) })
        .then((owner: any) => {
          resolve(owner);
        });
    });
  },
  editTheaterOwner: (newData: any, ownerId: string) => {
    return new Promise<void>(async (resolve, reject) => {
      const theaterOwner = await db
        .getDb()
        .collection(collections.OWNERS_COLLECTION)
        .findOne({ _id: ObjectID(ownerId) });
      // Checking if the email is chnged
      if (theaterOwner.email === newData.email) {
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
      } else {
        // Email has changed, new username and password has to be generated and send to the new email
        const username =
          newData.email.split("@")[0] + Math.floor(Math.random() * 10000 + 1); // Generating a username with email address
        const password = Math.random().toString(36).substring(7); // Generating password

        newData.username = username;
        newData.password = await hash(password, 10);

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
              Your registered email has chnaged. Your new Credentials are given below
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
            to: newData.email,
            subject: "Registered Email changed - CineMax",
            html: mailBody,
          })
          .then(() => {
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
          })
          .catch(() => {
            reject();
          });
      }
    });
  },
  deleteTheaterOwner: (ownerId: string) => {
    return new Promise<void>((resolve, reject) => {
      db.getDb()
        .collection(collections.OWNERS_COLLECTION)
        .deleteOne({ _id: ObjectID(ownerId) })
        .then(() => resolve())
        .catch(() => reject());
    });
  },
};
