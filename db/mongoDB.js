/*const MongoClient = require(‘mongodb’).MongoClient;
const uri = "mongodb+srv://alexandranadova:<password>@tester-yssrq.mongodb.net/ArchItUp";//test?retryWrites=true
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("ArchItUp").collection("devices");
  // perform actions on the collection object
  client.close();
});*/

//The require(‘mongoose’) call returns a Singleton object.
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://alexandranadova:3%21CdyHpfRMofUEkgvNg@tester-yssrq.mongodb.net/ArchItUp";

class Database {
  constructor() {}

  connectWithPromise() {
    mongoose
      .connect(uri)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch(err => {
        console.error("Database connection error");
      });
  }

  connectWithCallback() {
    mongoose.connect(uri, err => {
      if (err) return console.log(err);
      console.log("Database connection successful");
    });
  }
}

module.exports = new Database();
