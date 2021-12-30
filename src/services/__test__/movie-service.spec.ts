import { MovieService } from "../movie.service";

describe("Movie Service", () => {
  describe("addMovie", () => {
    const movieData = {
      title: "Avengers",
      year: 2011,
      runtimeHr: 2,
      runtimeMin: 20,
    };
    it("add a movie", async () => {
      const newMovieDocRef = MovieService.addMovie(movieData);

      expect(typeof newMovieDocRef).toBe("object");
    });
  });
});
