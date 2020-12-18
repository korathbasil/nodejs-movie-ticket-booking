const db = require("../config/dbConfig");
const collections = require("../config/collections");
const { ObjectID } = require("mongodb");

module.exports = {
  getAllMovies: () => {
    return new Promise(async (resolve, reject) => {
      const movies = await db
        .getDb()
        .collection(collections.MOVIE_COLLECTION)
        .find()
        .toArray();
      resolve(movies);
    });
  },
  getMovieById: (movieId) => {
    return new Promise((resolve, reject) => {
      db.getDb()
        .collection(collections.MOVIE_COLLECTION)
        .find({ _id: ObjectID(movieId) })
        .then((movie) => {
          resolve(movie);
        });
    });
  },
};
