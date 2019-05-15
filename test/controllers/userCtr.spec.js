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
    it("should not allow a empty firstName on post", () => {
      const user = new User();
      //const User = function(user) {
      // this.save = () => {};
      //};
      /*const req = new User({
        body: {
          firstName: "Peter",
          lastName: "Tester",
          email: "peter@mail.com",
          password: "Ab123123"
        }
      });
      User.
      console.log("what user " + req);*/
      const req = {
        body: {
          firstName: "Peter",
          lastName: "Tester",
          email: "peter@mail.com",
          password: "Ab123123"
        }
      }; 

      const use = new User({
        do
      })

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
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith("Last name is required").should.equal(true);
    });
  });

  /* describe("Login user", () => {
    it("Received a jwt", () => {

    });
  }); */

});
