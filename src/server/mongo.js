const config = require('../../config/config');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID

const Agenda = require('agenda');

const agenda = require('./jobs/Agenda');

let db;
module.exports = {
  connect: function () {
    MongoClient.connect(config.MONGO_DB_URL, function (err, client) {
      if (err) { console.log(err); }
      console.log('Succesfully connected to Mongo server');

      // const agenda = new Agenda().mongo(db);
     

      db = client.db(config.MONGO_DB_NAME);

      agenda.init(db);
    })
  },

  get: function () {
    return db;
  },

  createObjectID: function () {
    return new ObjectID()
  },

  objectId: function (id) {
    return new ObjectID(id);
  }
}
