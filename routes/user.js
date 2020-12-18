var express = require("express");
var router = express.Router();

const userHelpers = require("../helpers/user-helpers");

// Home Page
router.get("/", function (req, res) {
  userHelpers.getAllMovies().then((movies) => {
    res.render("user/home", { title: "Home - Cinemax", movies: movies });
  });
});
router.get("/movie/:id", (req, res) => {
  const movieId = req.params.id;
  userHelpers.getMovieById(movieId).then((movie) => {
    res.render("user/movie", { movie: movie });
    console.log(movie);
  });
});
router.get("/cinemas", (req, res) => {
  res.render("user/cinemas");
});
router.get("/account", (req, res) => {
  res.render("user/account");
});

module.exports = router;
