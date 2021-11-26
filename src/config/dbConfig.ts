// import { MongoClient } from "mongodb";

// let db;
// export const connect = (done) => {
//   const connectionURL = "mongodb://localhost:27017";
//   const dbName = "MovieTicketBooking";

//   MongoClient.connect(
//     connectionURL,
//     { useUnifiedTopology: true },
//     (err, data) => {
//       if (err) {
//         done(err);
//       } else {
//         db = data.db(dbName);
//         done(null, db);
//       }
//     }
//   );
// };

// export default getDb = () => {
//   if (db) {
//     return db;
//   } else console.log("Error happened");
// };

import { MongoClient, Db } from "mongodb";

import { DB_CONNECTION_URL } from "./constants";
import dotenv from "dotenv";

let db: Db;

// export const connectToDatabase = (
//   cb: (err: AnyError | undefined, db: Db | null) => void
// ) => {
//   const client = new MongoClient(DB_CONNECTION_URL);

//   client.connect((err, data) => {
//     if (err) return cb(err, null);
//     if (data) {
//       if (NODE_ENV === "dev") db = data.db("movie-ticket-booking-app-dev");
//       else if (NODE_ENV === "test")
//         db = data.db("movie-ticket-booking-app-test");
//       else if (NODE_ENV === "prod") db = data.db("movie-ticket-booking-app");

//       return cb(undefined, db);
//     }
//   });
// };

export async function connectToDatabase() {
  dotenv.config();

  const client: MongoClient = new MongoClient(DB_CONNECTION_URL);

  await client.connect();

  db = client.db(`movie-ticket-booking-app-${process.env.NODE_ENV}`);

  console.log(db);
}

export const getCollection = <T>(collectionName: string) => {
  if (db) {
    return db.collection<T>(collectionName);
  } else {
    console.log("Not connected to any database");
    return;
  }
};
