import { ObjectId } from "mongodb";

import { Movie, movieCollection } from "models/Movie.model";

type MovieData = {
  title: string;
  runtimeHr: number;
  runtimeMin: number;
};

export default class MovieServices {
  public static async addMovie(movieData: MovieData) {
    const newMovieData = {
      title: movieData.title,
      runtimeInMinutes: movieData.runtimeHr * 60 + movieData.runtimeMin,
    } as Movie;

    return movieCollection.insertOne(newMovieData);
  }

  public static async getMovieByID(id: string): Promise<Movie | null> {
    return movieCollection.findOne({ _id: new ObjectId(id) });
  }
  public static async getAllMovies(): Promise<Movie[]> {
    return movieCollection.find().toArray();
  }

  public static async editMovie() {}

  public static deleteMovie(id: string) {
    return movieCollection.deleteOne({ _id: new ObjectId(id) });
  }
}

export const services = {
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
