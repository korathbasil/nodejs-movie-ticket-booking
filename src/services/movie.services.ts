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
