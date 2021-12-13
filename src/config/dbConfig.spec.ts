import { connectToDatabase, getCollection } from "./dbConfig";

beforeAll(async () => {
  connectToDatabase();
});

describe("DB connection", () => {
  test("getCollection returns a collection", () => {
    const namesCollection = getCollection("names");
    expect(namesCollection).toBeTruthy();
  });
});
