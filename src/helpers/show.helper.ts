import datefns from "date-fns";

export default {
  verifyShowTimings: (currentShows: any, movie: any, newShow: any, cb: any) => {
    return new Promise(async () => {
      //   var datefns = require("date-fns");
      // Altering newShow object with start and end time in ISO
      newShow.showStartTime = datefns.parseISO(newShow.datetime);
      newShow.showEndTime = datefns.addMinutes(
        newShow.showStartTime,
        movie.runtimeInMin
      );
      delete newShow.datetime;

      if (currentShows.length === 0) {
        cb(null, newShow);
      } else {
        await currentShows.forEach((show: any) => {
          // Adding 30min breaktime to the show
          show.showEndTime = datefns.addMinutes(show.showEndTime, 30);
          const isTimeOverlapping = datefns.areIntervalsOverlapping(
            { start: newShow.showStartTime, end: newShow.showEndTime },
            { start: show.showStartTime, end: show.showEndTime }
          );
          if (isTimeOverlapping) {
            cb(true, null);
          }
        });
        cb(null, newShow);
      }
    });
  },
};
