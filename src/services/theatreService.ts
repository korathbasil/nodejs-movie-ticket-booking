import { getCollection } from "config/dbConfig";
import { passwordHelpers } from "helpers";
import { Theater } from "models/theaterModel";

const { ObjectID } = require("mongodb");

const db = require("../config/dbConfig");
const collections = require("../config/collections");

const theaterCollection = getCollection<Theater>("theaters")!;

export class TheaterServices {
  public static async getTheaterByID(id: string): Promise<Theater | null> {
    return theaterCollection.findOne({ _id: ObjectID(id) });
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

export default {
  getOwnerById: async (id: string) => {
    const owner = await db
      .getDb()
      .collection(collections.OWNERS_COLLECTION)
      .findOne({ _id: ObjectID(id) });
    return owner;
  },
  getScreens: (ownerId) => {
    return new Promise(async (resolve, reject) => {
      const owner = await db
        .getDb()
        .collection(collections.OWNERS_COLLECTION)
        .aggregate([
          { $match: { _id: ObjectID(ownerId) } },
          {
            $lookup: {
              from: collections.SCREEN_COLLECTION,
              foreignField: "_id",
              localField: "screens",
              as: "screens",
            },
          },
        ])
        .toArray();
      resolve(owner[0].screens);
    });
  },
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
  verifyShowTiming: (currentShows, movie, newShow, cb) => {
    return new Promise(async (resolve, reject) => {
      var datefns = require("date-fns");
      // Altering newShow object with start and end time in ISO
      newShow.showStartTime = datefns.parseISO(newShow.datetime);
      newShow.showEndTime = datefns.addMinutes(
        newShow.showStartTime,
        movie.runtimeInMin
      );
      delete newShow.datetime;

      if (currentShows.length === 0) {
        cb(null, newShow);
      } else {
        await currentShows.forEach((show) => {
          // Adding 30min breaktime to the show
          show.showEndTime = datefns.addMinutes(show.showEndTime, 30);
          const isTimeOverlapping = datefns.areIntervalsOverlapping(
            { start: newShow.showStartTime, end: newShow.showEndTime },
            { start: show.showStartTime, end: show.showEndTime }
          );
          if (isTimeOverlapping) {
            cb(true, null);
          }
        });
        cb(null, newShow);
      }
    });
  },
  addShow: (screenId, showDetails) => {
    return new Promise(async (resolve, reject) => {
      showDetails.movie = ObjectID(showDetails.movie);
      const screen = await db
        .getDb()
        .collection(collections.SCREEN_COLLECTION)
        .findOne({ _id: ObjectID(screenId) });
      const vipSeats = new Array();
      const premiumSeats = new Array();
      const executiveSeats = new Array();
      const normalSeats = new Array();
      // No of seats
      const rowSeats = parseInt(screen.rowSeats);
      const vip = parseInt(screen.vip);
      const premium = parseInt(screen.premium);
      const executive = parseInt(screen.executive);
      const normal = parseInt(screen.normal);
      const lettersArray = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "AA",
        "AB",
        "AC",
        "AD",
        "AE",
        "AF",
        "AG",
        "AH",
        "AI",
        "AJ",
        "AK",
        "AL",
        "AM",
        "AN",
        "AO",
        "AP",
        "AQ",
        "AR",
        "AS",
        "AT",
        "AU",
        "AV",
        "AW",
        "AX",
        "AY",
        "AZ",
      ];
      const numbersArray = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
        57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
        75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92,
        93, 94, 95, 96, 97, 98, 99, 100,
      ];
      // Creating VIP seats
      for (let i = 0; i < vip; i++) {
        vipSeats.push(new Array());
      }
      for (i = 0; i < vip; i++) {
        for (let j = 0; j < rowSeats; j++) {
          vipSeats[i][j] = {
            seatId: lettersArray[i] + numbersArray[j],
            booked: false,
          };
        }
      }
      // console.log(vipSeats);
      // Creating Premium seats
      for (i = vip; i < premium + vip; i++) {
        premiumSeats.push(new Array());
      }
      for (i = vip; i < premium + vip; i++) {
        for (j = 0; j < rowSeats; j++) {
          premiumSeats[i - vip][j] = {
            seatId: lettersArray[i] + numbersArray[j],
            booked: false,
          };
        }
      }
      // console.log(premiumSeats);
      // Creating Executive seats
      for (i = vip + premium; i < vip + premium + executive; i++) {
        executiveSeats.push(new Array());
      }
      for (i = vip + premium; i < premium + vip + executive; i++) {
        for (j = 0; j < rowSeats; j++) {
          executiveSeats[i - (vip + premium)][j] = {
            seatId: lettersArray[i] + numbersArray[j],
            booked: false,
          };
        }
      }
      // console.log(executiveSeats);
      // Creating Normal seats
      for (
        i = vip + premium + executive;
        i < premium + vip + executive + normal;
        i++
      ) {
        normalSeats.push(new Array());
      }
      for (
        i = vip + premium + executive;
        i < premium + vip + executive + normal;
        i++
      ) {
        for (j = 0; j < rowSeats; j++) {
          normalSeats[i - (vip + premium + executive)][j] = {
            seatId: lettersArray[i] + numbersArray[j],
            booked: false,
          };
        }
      }
      // console.log(normalSeats);
      showDetails.vipSeats = vipSeats;
      showDetails.premiumSeats = premiumSeats;
      showDetails.executiveSeats = executiveSeats;
      showDetails.normalSeats = normalSeats;
      // Adding show to Show collection
      db.getDb()
        .collection(collections.SHOW_COLLECTION)
        .insertOne(showDetails)
        .then((data) => {
          db.getDb()
            .collection(collections.SCREEN_COLLECTION)
            .updateOne(
              { _id: ObjectID(screenId) },
              {
                $push: { shows: ObjectID(data.ops[0]._id) },
              }
            )
            .then(() => resolve());
        });
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
  getMovies: () => {
    return new Promise(async (resolve, reject) => {
      const movies = await db
        .getDb()
        .collection(collections.MOVIE_COLLECTION)
        .find({})
        .toArray();
      console.log(movies);
      resolve(movies);
    });
  },
  addMovie: (movieDetails) => {
    return new Promise((resolve, reject) => {
      movieDetails.runtimeInMin =
        parseInt(movieDetails.runtimeHr) * 60 +
        parseInt(movieDetails.runtimeMin);
      delete movieDetails.runtimeHr;
      delete movieDetails.runtimeMin;
      db.getDb()
        .collection(collections.MOVIE_COLLECTION)
        .insertOne(movieDetails)
        .then(() => resolve())
        .catch((e) => {
          console.log(e);
          reject();
        });
    });
  },
  getMovieById: (movieId) => {
    return new Promise((resolve, reject) => {
      db.getDb()
        .collection(collections.MOVIE_COLLECTION)
        .findOne({ _id: ObjectID(movieId) })
        .then((movie) => resolve(movie));
    });
  },
  editMovie: (newData, movieId) => {
    return new Promise((resolve, reject) => {
      db.getDb()
        .collection(collections.MOVIE_COLLECTION)
        .updateOne(
          { _id: ObjectID(movieId) },
          {
            $set: newData,
          }
        )
        .then(() => resolve())
        .catch(() => reject());
    });
  },
  deleteMovie: (movieId) => {
    return new Promise((resolve, reject) => {
      db.getDb()
        .collection(collections.MOVIE_COLLECTION)
        .deleteOne({ _id: ObjectID(movieId) })
        .then(() => resolve())
        .catch(() => reject());
    });
  },
};
