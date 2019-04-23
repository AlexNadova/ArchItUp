const MongoClient = require(‘mongodb’).MongoClient;
const uri = "mongodb+srv://alexandranadova:<password>@tester-yssrq.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


//The require(‘mongoose’) call returns a Singleton object.
const mongoose = require("mongoose");

const server = "exer6BookDb:27017"; //'jesper:1tester@ds159377.mlab.com:59377'; // REPLACE WITH YOUR DB SERVER
const database = "testerdb"; // REPLACE WITH YOUR DB NAME;

// exer6BookDb:27017

class Database {
  constructor() {}

  connectWithPromise() {
    mongoose
      .connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch(err => {
        console.error("Database connection error");
      });
  }

  connectWithCallback() {
    mongoose.connect(`mongodb://${server}/${database}`, err => {
      if (err) return console.log(err);
      console.log("Database connection successful");
    });
  }
}

module.exports = new Database();