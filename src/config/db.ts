import { Db, MongoClient } from "mongodb";

import { DB_CONNECTION_URL } from "./constants";

class Database {
  db: Db;
  mongoClient: MongoClient;

  _instance: Database;

  constructor(uri: string) {
    if (this._instance) return this._instance;
    this.connect(uri);
    this._instance = this;
  }

  async connect(uri: string) {
    this.mongoClient = new MongoClient(uri);

    try {
      await this.mongoClient.connect();

      this.db = this.mongoClient.db(
        `movie-ticket-booking-app-${process.env.NODE_ENV}`
      );
    } catch (e) {
      console.error("Unable to connect to the database");
    }
  }
}

const db = new Database(DB_CONNECTION_URL);

export { db };
