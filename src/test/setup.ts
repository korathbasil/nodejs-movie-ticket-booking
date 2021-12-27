import { MongoMemoryServer } from "mongodb-memory-server";

import { connectToDatabase, getMongoClient, getDb } from "../config/dbConfig";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  try {
    await connectToDatabase(mongoUri);
  } catch (e) {
    console.error(e);
  }
});

beforeEach(async () => {
  const collections = await getDb().collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await getMongoClient().close();
});
