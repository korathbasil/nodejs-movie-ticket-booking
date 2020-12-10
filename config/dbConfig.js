const mongoClient = require("mongodb").MongoClient;

let db;
module.exports.connect = (done) => {
  const connectionURL = "mongodb://localhost:27017";
  const dbName = "MovieTicketBooking";

  mongoClient.connect(
    connectionURL,
    { useUnifiedTopology: true },
    (err, data) => {
      if (err) {
        done(err);
      } else {
        db = data.db(dbName);
        done(null, db);
      }
    }
  );
};

module.exports.getDb = () => {
  if (db) {
    return db;
  }
};
