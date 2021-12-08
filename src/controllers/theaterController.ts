import { Request, Response } from "express";
import sharp from "sharp";

import theaterService from "../services/theater.service";

export default {
  getLogin: (_: Request, res: Response) => {
    res.render("theater/login", {
      theaterRoute: true,
      title: "Login - Theater - Cinemax",
    });
  },

  getLogout: (req: Request, res: Response) => {
    req.session.theater = null;
    req.session.destroy();
    req.logout();
    res.redirect("/theater/login");
  },

  getDashboard: (req: Request, res: Response) => {
    res.render("theater/dashboard", {
      theaterRoute: true,
      title: "Dashboard - Theater - Cinemax",
      theater: req.session.theater,
    });
  },

  getScreenManagement: (req: Request, res: Response) => {
    const ownerId = req.session.passport.user;
    theaterService.getScreens(ownerId).then((screens) => {
      console.log(screens);
      res.render("theater/screen-management", {
        theaterRoute: true,
        title: "Screen Management - Theater - Cinemax",
        theater: req.session.theater,
        screens: screens,
      });
    });
  },

  getAddScreen: (req: Request, res: Response) => {
    res.render("theater/add-screen", {
      theaterRoute: true,
      title: "Screen Management - Theater - Cinemax",
      theater: req.session.theater,
    });
  },

  postAddScreen: (req: Request, res: Response) => {
    const ownerId = req.session.passport.user;
    // console.log(req.body);
    // const screen = {};
    // screen.name = req.body.name;
    theaterService
      .addScreen(req.body, ownerId)
      .then(() => res.redirect("/theater/screen"))
      .catch(() => res.redirect("/theater/screen/add-screen"));
  },

  getScennSchedule: (req: Request, res: Response) => {
    const screenId = req.params.screenId;
    theaterService.getScreenDetailsById(screenId).then((screen) => {
      // console.log(JSON.stringify(screen, null, 4));
      res.render("theater/screen-schedule", {
        theaterRoute: true,
        title: "Screen Management - Theater - Cinemax",
        theater: req.session.theater,
        screen: screen,
      });
    });
  },

  getAddShow: (req: Request, res: Response) => {
    const screenId = req.params.screenId;
    theaterService.getMovies().then((movies) => {
      res.render("theater/add-show", {
        theaterRoute: true,
        title: "Screen Management - Theater - Cinemax",
        theater: req.session.theater,
        screenId: screenId,
        movies: movies,
      });
    });
  },

  postAddShow: async (req: Request, res: Response) => {
    const screenId = req.params.screenId;
    const movie = await theaterService.getMovieById(req.body.movie);
    const screen: any = await theaterService.getScreenDetailsById(screenId);
    theaterService.verifyShowTiming(
      screen.shows,
      movie,
      req.body,
      (err: any, show: any) => {
        if (err) {
          res.redirect(`/theater/screen/schedule/${screenId}/add-show`);
        } else {
          theaterService.addShow(screenId, show).then(() => {
            res.redirect(`/theater/screen/schedule/${screenId}`);
          });
        }
      }
    );
  },

  getEditScreen: (req: Request, res: Response) => {
    const screenId = req.params.screenId;
    theaterService.getScreenById(screenId).then((screen) => {
      res.render("theater/edit-screen", {
        theaterRoute: true,
        title: "Movie Management - Theater - Cinemax",
        theater: req.session.theater,
        screen: screen,
      });
    });
  },

  postEditScreen: (req: Request, res: Response) => {
    const screenId = req.params.screenId;
    theaterService
      .editScreen(screenId, req.body)
      .then(() => res.redirect("/theater/screen"));
  },

  getDeleteScreen: (req: Request, res: Response) => {
    const screenId = req.params.screenId;
    const ownerId = req.session.passport.user;
    theaterService
      .deleteScreen(screenId, ownerId)
      .then(() => res.redirect("/theater/screen"));
  },

  getMovies: (req: Request, res: Response) => {
    theaterService
      .getMovies()
      .then((movies) => {
        res.render("theater/movie-management", {
          theaterRoute: true,
          title: "Movie Management - Theater - Cinemax",
          theater: req.session.theater,
          movies: movies,
        });
      })
      .catch(() => {
        res.render("theater/movie-management", {
          theaterRoute: true,
          title: "Movie Management - Theater - Cinemax",
          theater: req.session.theater,
        });
      });
  },

  getAddMovie: (req: Request, res: Response) => {
    res.render("theater/add-movie", {
      theaterRoute: true,
      title: "Movie Management - Theater - Cinemax",
      theater: req.session.theater,
    });
  },

  postAddMovie: async (req: Request, res: Response) => {
    const image = req.files.poster;
    // console.log(image);
    const fileExtension =
      image.name.split(".")[image.name.split(".").length - 1]; // Getting file extension by splitting on extesion dot(.)
    const fileName = new Date().toISOString() + "." + fileExtension; // Creating a new file name with new Date() and fileExtension
    const imagePath = "/images/movies/" + fileName; // Setting the public path
    req.body.poster = imagePath;
    // console.log(req.body);

    await sharp(req.files.poster.data)
      .resize({ width: 540 })
      .toFile(`./public/images/movies/${fileName}`)
      .then(() => {
        theaterService
          .addMovie(req.body)
          .then(() => {
            res.redirect("/theater/movie");
          })
          .catch(() => res.redirect("/theater/movie/add-movie"));
      });
  },

  getEditMovie: (req: Request, res: Response) => {
    const movieId = req.params.movieId;
    theaterService.getMovieById(movieId).then((movie) => {
      console.log(movie);
      res.render("theater/edit-movie", {
        theaterRoute: true,
        title: "Movie Management - Theater - Cinemax",
        theater: req.session.theater,
        movie: movie,
      });
    });
  },

  postEditMovie: (req: Request, res: Response) => {
    const movieId = req.params.movieId;
    theaterService
      .editMovie(req.body, movieId)
      .then(() => res.redirect("/theater/movie"));
  },

  getDeleteMovie: (req: Request, res: Response) => {
    const movieId = req.params.movieId;
    theaterService
      .deleteMovie(movieId)
      .then(() => res.redirect("/theater/movie"))
      .catch(() => res.redirect("/theater/movie"));
  },

  getUserActivityTracker: (req: Request, res: Response) => {
    res.render("theater/user-activity", {
      theaterRoute: true,
      title: "User Activity Tracker - Theater - Cinemax",
      theater: req.session.theater,
    });
  },

  getAccount: (req: Request, res: Response) => {
    res.render("theater/account", {
      theaterRoute: true,
      title: "My Account - Theater - Cinemax",
      theater: req.session.theater,
    });
  },

  //   fn: (req: Request, res: Response) => {},
};
