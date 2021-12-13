import { InsertOneResult, Document, ObjectId } from "mongodb";

const mockGetCollection = jest.fn((_: string) => {
  return {
    insertOne: async (_: any): Promise<InsertOneResult<Document>> => {
      return {
        insertedId: new ObjectId(),
        acknowledged: true,
      };
    },
  };
});

jest.mock("../config/dbConfig", () => ({
  get getCollection() {
    return mockGetCollection;
  },
}));
