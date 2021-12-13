import { MongoClient, Db } from "mongodb";

import { DB_CONNECTION_URL } from "./constants";

let db: Db;

export async function connectToDatabase() {
  const client: MongoClient = new MongoClient(DB_CONNECTION_URL);

  try {
    await client.connect();
  } catch (e) {
    // console.log(e);
  }
  db = client.db(`movie-ticket-booking-app-${process.env.NODE_ENV}`);
  console.log(db);

  console.log(db.collections);
}

export const getCollection = <T>(collectionName: string) => {
  if (db) {
    return db.collection<T>(collectionName);
  } else {
    console.log("Not connected to any database");
    return;
  }
};
