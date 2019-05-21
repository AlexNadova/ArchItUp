const should = require("should");
const sinon = require("sinon");
const userCtr = require("../../controllers/userController");
const User = require("../../models/userModel");

// BDD style testing

// Describe what is testing - controller
describe("User Controller Tests", () => {
  // what is testing - method
  describe("SignUp user", () => {
    // Layout the test
    it("should have all required properties to create user", () => {
      //const User = function(user) {
      // this.save = () => {};
      // User.arguments();
      //};

      /* const req = {
        body: {
          User: {
            firstName: "Peter",
            lastName: "Tester",
            email: "peter@mail.com",
            password: "Ab123123"
          }
        }
      }; */
      const req = new User({
          firstName: "Peter",
          lastName: "Tester",
          email: "peter@mail.com",
          password: "Ab123123"
      });

      console.log("-------console.log-------- \na user " + req + "\n ------------------------");
      /*
      const req = {
        body: {
          firstName: "Peter",
          city: User.what = "herMan",
          description: User.description = "sdfc sdv df ",
          lastName: "Tester",
          email: "peter@mail.com",
          password: "Ab123123"
        }
      }; */

      const res = {
        /* sinon.spy(): Is creating a spy function using Sinon framework 
          that's going to keep track of what's called, what it's called with, how many times it's called  */
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      const controller = userCtr;
      controller.user_signup(req, res);
      User.find(req.body.email);
      res.status
      .calledWith(400)
      //.should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      //res.send.calledWith("Last name is required").should.equal(true);
      console.log("--- After " + res.status);
    });
  });

  /* describe("Login user", () => {
    it("Received a jwt", () => {

    });
  }); */
});
