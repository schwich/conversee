const config = require('../../config/config');
const MongoClient = require('mongodb').MongoClient;

let db;
module.exports = {
  connect: function () {
    MongoClient.connect(config.MONGO_DB_URL, function (err, client) {
      if (err) { console.log(err); }
      console.log('Succesfully connected to Mongo server');

      db = client.db(config.MONGO_DB_NAME);
    })
  },

  get: function () {
    return db;
  }
}
