import { ObjectId } from "mongodb";

import { Movie, movieCollection } from "../models";

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

  public static async editMovie(newMovieData: any, movieId: string) {
    return movieCollection.updateOne(
      { _id: new ObjectId(movieId) },
      {
        $set: newMovieData,
      }
    );
  }

  public static deleteMovie(id: string) {
    return movieCollection.deleteOne({ _id: new ObjectId(id) });
  }
}
