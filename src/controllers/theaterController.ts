import { Request, Response } from "express";
// import sharp from "sharp";

export class TheaterController {
  public static getLogin(_: Request, res: Response) {
    res.render("theater/login", {
      theaterRoute: true,
      hideSidebar: true,
      title: "Login - Theater - Cinemax",
    });
  }
  // getLogout: (req: Request, res: Response) => {
  //   req.session.theater = null;
  //   req.session.destroy();
  //   req.logout();
  //   res.redirect("/theater/login");
  // },
  public static getHome(_: Request, res: Response) {
    res.render("theater/home", {
      theaterRoute: true,
      title: "Home - Theater - Cinemax",
    });
  }
  // public static getScreenManagement(req: Request, res: Response) {
  //   const ownerId = req.session.passport.user;
  //   TheaterService.getAScreens(ownerId).then((screens: any) => {
  //     console.log(screens);
  //     res.render("theater/screen-management", {
  //       theaterRoute: true,
  //       title: "Screen Management - Theater - Cinemax",
  //       theater: req.session.theater,
  //       screens: screens,
  //     });
  //   });
  // },
  // getAddScreen: (req: Request, res: Response) => {
  //   res.render("theater/add-screen", {
  //     theaterRoute: true,
  //     title: "Screen Management - Theater - Cinemax",
  //     theater: req.session.theater,
  //   });
  // },
  // postAddScreen: (req: Request, res: Response) => {
  //   const ownerId = req.session.passport.user;
  //   // console.log(req.body);
  //   // const screen = {};
  //   // screen.name = req.body.name;
  //   TheaterService
  //     .addScreen(req.body, ownerId)
  //     .then(() => res.redirect("/theater/screen"))
  //     .catch(() => res.redirect("/theater/screen/add-screen"));
  // },
  // getScennSchedule: (req: Request, res: Response) => {
  //   const screenId = req.params.screenId;
  //   TheaterService.getScreenDetailsById(screenId).then((screen: any) => {
  //     // console.log(JSON.stringify(screen, null, 4));
  //     res.render("theater/screen-schedule", {
  //       theaterRoute: true,
  //       title: "Screen Management - Theater - Cinemax",
  //       theater: req.session.theater,
  //       screen: screen,
  //     });
  //   });
  // },
  // getAddShow: (req: Request, res: Response) => {
  //   const screenId = req.params.screenId;
  //   TheaterService.getMovies().then((movies: any) => {
  //     res.render("theater/add-show", {
  //       theaterRoute: true,
  //       title: "Screen Management - Theater - Cinemax",
  //       theater: req.session.theater,
  //       screenId: screenId,
  //       movies: movies,
  //     });
  //   });
  // },
  // postAddShow: async (req: Request, res: Response) => {
  //   const screenId = req.params.screenId;
  //   const movie = await TheaterService.getMovieById(req.body.movie);
  //   const screen: any = await TheaterService.getScreenDetailsById(screenId);
  //   TheaterService.verifyShowTiming(
  //     screen.shows,
  //     movie,
  //     req.body,
  //     (err: any, show: any) => {
  //       if (err) {
  //         res.redirect(`/theater/screen/schedule/${screenId}/add-show`);
  //       } else {
  //         TheaterService.addShow(screenId, show).then(() => {
  //           res.redirect(`/theater/screen/schedule/${screenId}`);
  //         });
  //       }
  //     }
  //   );
  // },
  // getEditScreen: (req: Request, res: Response) => {
  //   const screenId = req.params.screenId;
  //   TheaterService.getScreenById(screenId).then((screen: any) => {
  //     res.render("theater/edit-screen", {
  //       theaterRoute: true,
  //       title: "Movie Management - Theater - Cinemax",
  //       theater: req.session.theater,
  //       screen: screen,
  //     });
  //   });
  // },
  // postEditScreen: (req: Request, res: Response) => {
  //   const screenId = req.params.screenId;
  //   TheaterService
  //     .editScreen(screenId, req.body)
  //     .then(() => res.redirect("/theater/screen"));
  // },
  // getDeleteScreen: (req: Request, res: Response) => {
  //   const screenId = req.params.screenId;
  //   const ownerId = req.session.passport.user;
  //   TheaterService
  //     .deleteScreen(screenId, ownerId)
  //     .then(() => res.redirect("/theater/screen"));
  // },
  // getMovies: (req: Request, res: Response) => {
  //   TheaterService
  //     .getMovies()
  //     .then((movies: any) => {
  //       res.render("theater/movie-management", {
  //         theaterRoute: true,
  //         title: "Movie Management - Theater - Cinemax",
  //         theater: req.session.theater,
  //         movies: movies,
  //       });
  //     })
  //     .catch(() => {
  //       res.render("theater/movie-management", {
  //         theaterRoute: true,
  //         title: "Movie Management - Theater - Cinemax",
  //         theater: req.session.theater,
  //       });
  //     });
  // },
  // getAddMovie: (req: Request, res: Response) => {
  //   res.render("theater/add-movie", {
  //     theaterRoute: true,
  //     title: "Movie Management - Theater - Cinemax",
  //     theater: req.session.theater,
  //   });
  // },
  // postAddMovie: async (req: Request, res: Response) => {
  //   const image = req.files.poster;
  //   // console.log(image);
  //   const fileExtension =
  //     image.name.split(".")[image.name.split(".").length - 1]; // Getting file extension by splitting on extesion dot(.)
  //   const fileName = new Date().toISOString() + "." + fileExtension; // Creating a new file name with new Date() and fileExtension
  //   const imagePath = "/images/movies/" + fileName; // Setting the public path
  //   req.body.poster = imagePath;
  //   // console.log(req.body);
  //   await sharp(req.files.poster.data)
  //     .resize({ width: 540 })
  //     .toFile(`./public/images/movies/${fileName}`)
  //     .then(() => {
  //       TheaterService
  //         .addMovie(req.body)
  //         .then(() => {
  //           res.redirect("/theater/movie");
  //         })
  //         .catch(() => res.redirect("/theater/movie/add-movie"));
  //     });
  // },
  // getEditMovie: (req: Request, res: Response) => {
  //   const movieId = req.params.movieId;
  //   TheaterService.getMovieById(movieId).then((movie: any) => {
  //     console.log(movie);
  //     res.render("theater/edit-movie", {
  //       theaterRoute: true,
  //       title: "Movie Management - Theater - Cinemax",
  //       theater: req.session.theater,
  //       movie: movie,
  //     });
  //   });
  // },
  // postEditMovie: (req: Request, res: Response) => {
  //   const movieId = req.params.movieId;
  //   TheaterService
  //     .editMovie(req.body, movieId)
  //     .then(() => res.redirect("/theater/movie"));
  // },
  // getDeleteMovie: (req: Request, res: Response) => {
  //   const movieId = req.params.movieId;
  //   TheaterService
  //     .deleteMovie(movieId)
  //     .then(() => res.redirect("/theater/movie"))
  //     .catch(() => res.redirect("/theater/movie"));
  // },
  // getUserActivityTracker: (req: Request, res: Response) => {
  //   res.render("theater/user-activity", {
  //     theaterRoute: true,
  //     title: "User Activity Tracker - Theater - Cinemax",
  //     theater: req.session.theater,
  //   });
  // },
  // getAccount: (req: Request, res: Response) => {
  //   res.render("theater/account", {
  //     theaterRoute: true,
  //     title: "My Account - Theater - Cinemax",
  //     theater: req.session.theater,
  //   });
  // },
  //   fn: (req: Request, res: Response) => {},
}
