const bcrypt = require("bcrypt");

const db = require("../config/dbConfig");
const collections = require("../config/collections");
const { ObjectID } = require("mongodb");

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
  getScreenbyId: (screenId) => {
    return new Promise((resolve, reject) => {
      db.getDb()
        .collection(collections.SCREEN_COLLECTION)
        .findOne({ _id: ObjectID(screenId) })
        .then((screen) => resolve(screen));
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
