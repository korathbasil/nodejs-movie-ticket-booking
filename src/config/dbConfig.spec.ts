import { connectToDatabase, getCollection } from "./dbConfig";

// jest.setTimeout(10000);

beforeAll(async () => {
  await connectToDatabase();
});

describe("DB connection", () => {
  test("getCollection returns a collection", () => {
    const namesCollection = getCollection("names");
    expect(namesCollection).toBeTruthy();
  });
});
