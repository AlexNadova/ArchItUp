const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const ctr = require("../controllers/userController");

describe("User Controller", function() {
  it("should return a user", function() {
    //"localhost:4000/api/user/868b4e90a3c1318a7";
    const userId = "868b4e90a3c1318a7";
    const req = { params: userId };

    const res = {
      status: sinon.spy(),
      send: sinon.spy(),
      json: sinon.spy()
    };

    ctr.user_get_user(req, res);
    res.json();
    console.log("console: " + req.params + " and " + res.send + " - " + res.status + " - res.json: " + res.json);
    //res.status.calledWith().res.json();
    
    expect(res.status.calledOnce).to.be.true;

    expect(res.send.firstCall.args[0]).to.equal("bla");
  });
});
