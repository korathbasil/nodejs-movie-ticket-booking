const bcrypt = require("bcrypt");

const db = require("../config/dbConfig");
const collections = require("../config/collections");
const { ObjectID } = require("mongodb");

module.exports = {
  getOwnerById: (id) => {
    return db
      .getDb()
      .collection(collections.OWNERS_COLLECTION)
      .findOne({ _id: ObjectID(id) });
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
  addScreen: (screenData) => {
    return new Promise((resolve, reject) => {
      db.getDb()
        .collection(collections.OWNERS_COLLECTION)
        .updateOne(
          { _id: ObjectID("5fcfcffffe6a491c883567a8") },
          {
            $push: { screens: screenData },
          }
        )
        .then(() => resolve())
        .catch(() => reject());
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
};
