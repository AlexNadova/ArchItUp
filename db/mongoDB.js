
//The require(‘mongoose’) call returns a Singleton object.
const mongoose = require("mongoose");
const config = require("../config");

const uri = config.database.MONGODB;

class Database {
  constructor() {}

  connectWithPromise() {
    mongoose
      .connect(uri, {useNewUrlParser: true})
      .then(() => {
        console.log("Database connection successful");
      })
      .catch(err => {
        console.error("Database connection error");
      });
  }

  connectWithCallback() {
    mongoose.connect(uri, {useNewUrlParser: true}, err => {
      if (err) return console.log(err);
      console.log("Database connection successful");
    });
  }
}

module.exports = new Database();
