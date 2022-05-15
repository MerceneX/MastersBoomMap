const configKeys = require('./keys');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const state = {
  db: null
};

const connect = cb => {
  if (state.db) cb();
  else {
    MongoClient.connect(configKeys.mongoURI, mongoOptions, (err, client) => {
      if (err) cb(err);
      else {
        state.db = client.db(configKeys.dbName);
        cb();
      }
    });
  }
};
const getPrimaryKey = _id => {
  return ObjectID(_id);
};

const getDB = () => {
  return state.db;
};

module.exports = { getDB, connect, getPrimaryKey };
