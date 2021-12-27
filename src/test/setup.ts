import { MongoMemoryServer } from "mongodb-memory-server";

import { connectToDatabase, getMongoClient, getDb } from "config/dbConfig";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = mongo.getUri();

  await connectToDatabase(mongoUri);
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
