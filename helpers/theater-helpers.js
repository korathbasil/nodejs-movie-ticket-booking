const bcrypt = require("bcrypt");
const { ObjectID } = require("mongodb");

const db = require("../config/dbConfig");
const collections = require("../config/collections");

module.exports = {
  getOwnerById: async (id) => {
    const owner = await db
      .getDb()
      .collection(collections.OWNERS_COLLECTION)
      .findOne({ _id: ObjectID(id) });
    return owner;
  },
  login: (data) => {
    return new Promise(async (resolve, reject) => {
      const selectedUser = await db
        .getDb()
        .collection(collections.OWNERS_COLLECTION)
        .findOne({ username: data.username });
      if (selectedUser) {
        console.log("user found");
        isPasswordTrue = await bcrypt.compare(
          data.password,
          selectedUser.password
        );
        if (isPasswordTrue) {
          resolve(selectedUser);
        } else {
          reject({ message: "Incorrect Password" });
        }
      } else {
        reject({ message: "User not fonud" });
      }
    });
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
      const screen = await db
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
          {
            $group: {
              _id: "$_id",
              name: { $first: "$name" },
              shows: { $push: "$shows" },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              shows: {
                $filter: {
                  input: "$shows",
                  as: "shows",
                  cond: { $ifNull: ["$$shows._id", false] },
                },
              },
              // shows: { $arrayElemAt: ["$movie", 0] },
              // shows$movie: {
              //   $filter: {
              //     input: "$movie",
              //     as: "movie",
              //     cond: { $ifNull: ["$$movie._id", false] },
              //   },
              // },
            },
          },
          // {
          //   $lookup: {
          //     from: collections.SCREEN_COLLECTION,
          //     let: { partyId: "$_id" },
          //     pipeline: [
          //       { $match: { $expr: { $eq: ["$party_id", "$$partyId"] } } },
          //       {
          //         $lookup: {
          //           from: "addressComment",
          //           let: { addressId: "$_id" },
          //           pipeline: [
          //             {
          //               $match: {
          //                 $expr: { $eq: ["$address_id", "$$addressId"] },
          //               },
          //             },
          //           ],
          //           as: "address",
          //         },
          //       },
          //     ],
          //     as: "address",
          //   },
          // },
          // { $unwind: "$address" },
        ])
        .toArray();
      console.log(screen);
      console.log(screen[0].shows);
      resolve(screen[0]);
    });
  },
  addShow: (screenId, showDetails) => {
    return new Promise((resolve, reject) => {
      showDetails.movie = ObjectID(showDetails.movie);
      db.getDb()
        .collection(collections.SHOW_COLLECTION)
        .insertOne(showDetails)
        .then((data) => {
          db.getDb()
            .collection(collections.SCREEN_COLLECTION)
            .updateOne(
              { _id: ObjectID(screenId) },
              {
                $push: { shows: data.ops[0]._id },
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
      db.getDb()
        .collection(collections.MOVIE_COLLECTION)
        .insertOne(movieDetails)
        .then(() => resolve())
        .catch(() => reject());
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
