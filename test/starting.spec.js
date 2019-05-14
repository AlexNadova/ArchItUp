/* eslint-disable no-undef */
const expect = require("chai").expect;
const request = require("supertest");

const app = require("../app");
const userRouter = require("../routes/user");
const conn = require("../db/mongoDB");

// Describe out thing
describe("Basic Mocha Test", () => {
  before(done => {
    conn
      .connectWithCallback()
      .then(() => done())
      .catch(err => done(err));
  });

  after(done => {
    conn
      .closeConnection()
      .then(() => done())
      .catch(err => done(err));
  });

  // The test itself
  // done because it is asynchronous.
  it("Creating a new user", done => {
    request(userRouter)
      .post("/user/signup")
      .send({ firstName: "Peter", lastName: "Petersen", email: "peter@mail.com", password: "Ab123123" })
      .then(res => {
        const body = res.body;
        expect(body).to.contain("_id");
        expect(body).to.contain("firstName");
        expect(body).to.contain("lastName");
        expect(body).to.contain("email");
        expect(body).to.contain("password");
        done();
      });
  });
});
