import { ObjectId } from "mongodb";

import { getCollection } from "config/dbConfig";
import { passwordHelpers } from "helpers";
import { Theater } from "models/theaterModel";

const theaterCollection = getCollection<Theater>("theaters")!;

export class TheaterServices {
  public static async getTheaterByID(id: string): Promise<Theater | null> {
    return theaterCollection.findOne({ _id: new ObjectId(id) });
  }

  public static async login(theaterCredentials: {
    username: string;
    password: string;
  }) {
    const selectedDocument = await theaterCollection.findOne({
      username: theaterCredentials.username,
    });

    if (!selectedDocument) return;

    return passwordHelpers.comparePassword(
      theaterCredentials.password,
      selectedDocument.password
    );
  }
}
