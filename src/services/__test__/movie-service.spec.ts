import { ObjectId } from "mongodb";

import { MovieService } from "../movie.service";
import { getCollection } from "../../config/dbConfig";
import { Movie } from "../../models";

describe("Movie Service", () => {
  const movieData = {
    title: "Avengers",
    year: 2011,
    runtimeHr: 2,
    runtimeMin: 20,
  };
  describe("addMovie", () => {
    it("add a movie", async () => {
      const movieCollection = getCollection<Movie>("movies")!;

      const newMovieDocRef = await MovieService.addMovie(movieData);

      const movie = await movieCollection.findOne({
        _id: new ObjectId(newMovieDocRef.insertedId),
      });

      expect(typeof newMovieDocRef).toBe("object");
      expect(movie?.title).toEqual("Avengers");
      expect(movie?.year).toEqual(2011);
    });
  });

  describe("getMovieById", () => {
    it("gives back a movie for a valid id", async () => {
      const newMovieDocRef = await MovieService.addMovie(movieData);

      const movie = await MovieService.getMovieById(
        newMovieDocRef.insertedId.toString()
      );

      expect(typeof movie).toBe("object");
      expect(movie?.title).toEqual("Avengers");
      expect(movie?.year).toEqual(2011);
    });

    it("gives back undefined for invalid ids ", async () => {
      const movie = await MovieService.getMovieById(new ObjectId().toString());
      expect(movie).toEqual(null);
    });
  });

  describe("getAllMovies", () => {
    it("returns empty array before adding any movies", async () => {
      const movies = await MovieService.getAllMovies();

      expect(movies.length).toEqual(0);
    });

    it("returns an array containing the inserted movie", async () => {
      await MovieService.addMovie(movieData);

      const movies = await MovieService.getAllMovies();

      expect(movies.length).toEqual(1);
      expect(movies[0].title).toEqual("Avengers");
    });
  });
});
