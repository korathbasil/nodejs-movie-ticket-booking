import { Show } from "models/Show.model";
import { Collection, Document, InsertOneResult, ObjectId } from "mongodb";

import { makeShowService } from "./show.service";

describe("Show service", () => {
  const mockShowCollection = {
    insertOne: async (_: any): Promise<InsertOneResult<Document>> => {
      return {
        insertedId: new ObjectId(),
        acknowledged: true,
      };
    },
  } as Collection<Show>;

  const showService = makeShowService(mockShowCollection);
  test("addShow adds a show", async () => {
    const newShow = await showService.addShow({ time: new Date() });

    expect(typeof newShow).toBe("object");
  });
});
