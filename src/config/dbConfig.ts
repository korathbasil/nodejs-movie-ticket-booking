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

import { MongoClient, AnyError, Db } from "mongodb";

import { DB_CONNECTION_URL } from "./constants";

let db: Db | null = null;

export const connectToDatabase = (
  cb: (err: AnyError | undefined, db: Db | null) => void
) => {
  const client = new MongoClient(DB_CONNECTION_URL);

  client.connect((err, data) => {
    if (err) return cb(err, null);
    if (data) {
      db = data.db("movie-ticket-booking-app");
      return cb(undefined, db);
    }
  });
};

const getDb = () => {
  if (db) {
    return db;
  } else {
    console.log("Not connected to any database");
    return;
  }
};

export default getDb;
