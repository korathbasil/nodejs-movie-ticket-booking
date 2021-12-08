import { ObjectId } from "mongodb";

import { getCollection } from "config/dbConfig";
import { Screen } from "models/Screen.model";
import { Theater } from "models/theaterModel";

const screenCollection = getCollection<Screen>("screens")!;
const theaterCollection = getCollection<Theater>("theaters")!;

export class ScreenService {
  public static async getScreensByTheaterId(id: string) {
    return theaterCollection
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: "screens",
            foreignField: "_id",
            localField: "screens",
            as: "screens",
          },
        },
      ])
      .toArray();
  }

  public static async getScreenById(screenId: string) {
    return screenCollection.findOne({ _id: new ObjectId(screenId) });
  }

  public static async getScreenByIdWithAllDetails(id: string) {
    const screen = await screenCollection.findOne({ _id: new ObjectId(id) });

    if (screen?.shows.length === 0) return screen;

    const screenDetails = await screenCollection
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: "shows",
            foreignField: "_id",
            localField: "shows",
            as: "shows",
          },
        },
        {
          $unwind: {
            path: "$shows",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "movies",
            localField: "shows.movie",
            foreignField: "_id",
            as: "shows.movie",
          },
        },
        { $unwind: "$shows.movie" },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            shows: { $push: "$shows" },
          },
        },
      ])
      .toArray();

    return screenDetails;
  }

  public static async addScreen(
    theaterId: string,
    screenData: { name: string }
  ) {
    const newSCreenData = { ...screenData, shows: [] };

    try {
      const newScreenDocumentDetails = await screenCollection.insertOne(
        newSCreenData
      );
      await theaterCollection.updateOne(
        { _id: new ObjectId(theaterId) },
        {
          $push: { screens: new ObjectId(newScreenDocumentDetails.insertedId) },
        }
      );
      return newScreenDocumentDetails.insertedId;
    } catch (e) {
      return;
    }
  }

  public static async editScreen(id: string, newData: any) {
    return screenCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: newData,
      }
    );
  }

  public static async deleteScreen(screenId: string, theaterId: string) {
    screenCollection
      .deleteOne({ _id: new ObjectId(screenId) })
      .then(async () => {
        await theaterCollection.updateOne(
          { _id: new ObjectId(theaterId) },
          {
            $pull: { screens: new ObjectId(screenId) },
          }
        );
      });
  }
}
