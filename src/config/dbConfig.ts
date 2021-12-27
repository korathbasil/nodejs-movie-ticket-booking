import { MongoClient, Db } from "mongodb";

let db: Db;
let mongoClient: MongoClient;

export async function connectToDatabase(uri: string) {
  mongoClient = new MongoClient(uri);

  try {
    await mongoClient.connect();

    db = mongoClient.db(`movie-ticket-booking-app-${process.env.NODE_ENV}`);
    console.log("connected");
  } catch (e) {
    console.error("Unable to connect to the database");
  }
}

export const getCollection = <T>(collectionName: string) => {
  if (db) {
    return db.collection<T>(collectionName);
  } else {
    console.log("Not connected to any database");
    return;
  }
  // return db?.collection<T>(collectionName);
};

export const getDb = () => db;

export const getMongoClient = () => mongoClient;
