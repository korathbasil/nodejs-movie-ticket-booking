import { ObjectId } from "mongodb";

import { getCollection } from "config/dbConfig";
import { Screen } from "models/Screen.model";
import { Theater } from "models/theaterModel";

const screenCollection = getCollection<Screen>("screens")!;
const theaterCollection = getCollection<Theater>("theaters")!;

export class ScreenService {
  public static async getScreenByTheaterId(id: string) {
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

  public static async getAllScreens() {}
  public static asyncaddScreen() {}
  public static async editScreen() {}
  public static async deleteScreen() {}
}

export default {
  addScreen: (screenData, ownerId) => {
    return new Promise((resolve, reject) => {
      screenData.shows = [];
      db.getDb()
        .collection(collections.SCREEN_COLLECTION)
        .insertOne(screenData)
        .then((data) => {
          db.getDb()
            .collection(collections.OWNERS_COLLECTION)
            .updateOne(
              { _id: ObjectID(ownerId) },
              {
                $push: { screens: ObjectID(data.ops[0]._id) },
              }
            )
            .then(() => resolve());
        })
        .catch(() => reject());
    });
  },
  getScreenDetailsById: (screenId) => {
    return new Promise(async (resolve, reject) => {
      let screen = await db
        .getDb()
        .collection(collections.SCREEN_COLLECTION)
        .findOne({ _id: ObjectID(screenId) });
      if (screen.shows.length === 0) {
        resolve(screen);
      } else {
        screen = await db
          .getDb()
          .collection(collections.SCREEN_COLLECTION)
          .aggregate([
            { $match: { _id: ObjectID(screenId) } },
            {
              $lookup: {
                from: collections.SHOW_COLLECTION,
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
                from: collections.MOVIE_COLLECTION,
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
        resolve(screen[0]);
      }
    });
  },

  getScreenById: (screenId) => {
    return new Promise((resolve, reject) => {
      db.getDb()
        .collection(collections.SCREEN_COLLECTION)
        .findOne({ _id: ObjectID(screenId) })
        .then((screen) => resolve(screen))
        .catch((e) => console.log(e));
    });
  },
  editScreen: (screenId, newData) => {
    return new Promise((resolve, reject) => {
      db.getDb()
        .collection(collections.SCREEN_COLLECTION)
        .updateOne(
          { _id: ObjectID(screenId) },
          {
            $set: newData,
          }
        )
        .then(() => resolve())
        .catch((e) => console.log(e));
    });
  },
  deleteScreen: (screenId, ownerId) => {
    return new Promise((resolve, reject) => {
      db.getDb()
        .collection(collections.SCREEN_COLLECTION)
        .deleteOne({ _id: ObjectID(screenId) })
        .then(() => {
          db.getDb()
            .collection(collections.OWNERS_COLLECTION)
            .updateOne(
              { _id: ObjectID(ownerId) },
              {
                $pull: { screens: ObjectID(screenId) },
              }
            )
            .then(() => resolve());
        });
    });
  },
};
