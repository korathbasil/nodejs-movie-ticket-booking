import { ObjectId } from "mongodb";

import { getCollection } from "config/dbConfig";
import { Movie } from "models/Movie.model";

const movieCollection = getCollection<Movie>("movies")!;

export default class MovieServices {
  public static async getAllMovies(): Promise<Movie[]> {
    return movieCollection.find().toArray();
  }

  public static async addMovie() {}

  public static async getMovieByID(id: string): Promise<Movie | null> {
    return movieCollection.findOne({ _id: new ObjectId(id) });
  }

  public static async editMovie() {}

  public static async deleteMovie(id: string) {
    return movieCollection.deleteOne({ _id: new ObjectId(id) });
  }
}

export const services = {
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
};
