import { MongoClient, Db } from "mongodb";

import { DB_CONNECTION_URL } from "./constants";

let db: Db;

export async function connectToDatabase() {
  process.env.NODE_ENV = "test";
  const client: MongoClient = new MongoClient(DB_CONNECTION_URL);

  try {
    await client.connect();

    db = client.db(`movie-ticket-booking-app-${process.env.NODE_ENV}`);
    console.log(db);
  } catch (e) {
    throw new Error(e);
  }
}

export const getCollection = <T>(collectionName: string) => {
  if (db) {
    return db.collection<T>(collectionName);
  } else {
    console.log("Not connected to any database");
    return;
  }
};
