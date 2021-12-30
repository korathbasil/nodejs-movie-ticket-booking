import { getCollection } from "../config/dbConfig";
import { ObjectId } from "mongodb";

import { Movie } from "../models";

type MovieData = {
  title: string;
  year: number;
  runtimeHr: number;
  runtimeMin: number;
};

export class MovieService {
  public static async addMovie(movieData: MovieData) {
    const movieCollection = getCollection<Movie>("movies")!;

    const newMovieData = {
      title: movieData.title,
      year: movieData.year,
      runtimeInMinutes: movieData.runtimeHr * 60 + movieData.runtimeMin,
    } as Movie;

    return movieCollection.insertOne(newMovieData);
  }

  public static async getMovieByID(id: string): Promise<Movie | null> {
    const movieCollection = getCollection<Movie>("movies")!;

    return movieCollection.findOne({ _id: new ObjectId(id) });
  }
  public static async getAllMovies(): Promise<Movie[]> {
    const movieCollection = getCollection<Movie>("movies")!;

    return movieCollection.find().toArray();
  }

  public static async editMovie(newMovieData: any, movieId: string) {
    const movieCollection = getCollection<Movie>("movies")!;

    return movieCollection.updateOne(
      { _id: new ObjectId(movieId) },
      {
        $set: newMovieData,
      }
    );
  }

  public static deleteMovie(id: string) {
    const movieCollection = getCollection<Movie>("movies")!;

    return movieCollection.deleteOne({ _id: new ObjectId(id) });
  }

  // public static async getAllMovieShows() {
  //   return new Promise(async (resolve, reject) => {
  //     const scheduledMovies = await db
  //       .getDb()
  //       .collection(collections.SHOW_COLLECTION)
  //       .aggregate([
  //         {
  //           $lookup: {
  //             from: collections.MOVIE_COLLECTION,
  //             foreignField: "_id",
  //             localField: "movie",
  //             as: "movie",
  //           },
  //         },
  //         { $unwind: "$movie" },
  //         { $group: { _id: "$movie" } },
  //       ])
  //       .toArray();
  //     resolve(scheduledMovies);
  //   });
  // }

  // public static async getShowsOfAMovieById() {
  //   return new Promise(async (resolve, reject) => {
  //     const theaters = await db
  //       .getDb()
  //       .collection(collections.OWNERS_COLLECTION)
  //       .aggregate([
  //         {
  //           $lookup: {
  //             from: collections.SCREEN_COLLECTION,
  //             foreignField: "_id",
  //             localField: "screens",
  //             as: "screens",
  //           },
  //         },
  //         { $unwind: "$screens" },

  //         {
  //           $lookup: {
  //             from: collections.SHOW_COLLECTION,
  //             foreignField: "_id",
  //             localField: "screens.shows",
  //             as: "screens.shows",
  //             // let: { movie: "screen.shows.movie" },
  //             // pipeline: [{ $match: { movie: ObjectID(movieId) } }],
  //           },
  //         },
  //         {
  //           $group: {
  //             _id: {
  //               _id: "$_id",
  //               name: "$name",
  //             },
  //             // shows: { $push: "$screens.shows" },
  //             screens: { $push: "$screens" },
  //           },
  //         },
  //         {
  //           $unwind: {
  //             path: "$screens.shows",
  //           },
  //         },

  //         {
  //           $match: {
  //             "screens.shows.movie": ObjectID(movieId),
  //           },
  //         },

  //         // {
  //         //   $lookup: {
  //         //     from: collections.MOVIE_COLLECTION,
  //         //     let: { movie: ObjectID(movieId) },
  //         //     pipeline: [
  //         //       {
  //         //         $match: {
  //         //           $expr: {
  //         //             $eq: ["$_id", "$movie"],
  //         //           },
  //         //         },
  //         //       },
  //         //     ],
  //         //     as: "screens.shows.movie",
  //         //   },
  //         // },
  //         // { $match: { screen } },

  //         // {
  //         //   $lookup: {
  //         //     from: collections.MOVIE_COLLECTION,
  //         //     foreignField: "_id",
  //         //     localField: "screens.shows.movie",
  //         //     as: "screens.shows.movie",
  //         //   },
  //         // },
  //         // { $unwind: "$screens.shows.movie" },
  //         // { $project: { theater: 1, screens: 1 } },
  //         // {
  //         //   $group: {
  //         //     _id: {
  //         //       _id: "$_id",
  //         //       name: "$name",
  //         //     },
  //         //     screens: {
  //         //       $group: {
  //         //         _id: "$screens._id",
  //         //       },
  //         //     },
  //         //     // screens$shows: { $push: "$screens.shows" },
  //         //   },
  //         // },
  //       ])
  //       .toArray();
  //     console.log(theaters[0].screens);
  //     resolve(theaters);
  //     // console.log(JSON.stringify(movie, null, 4));
  //   });
  // }
}
