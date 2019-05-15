const assert = require("assert");
const middleware = require("../../middleware/verifyPermissions");
const config = require("../../config");

// Systems users
const pl1 = 1;
const pl2 = 7;
const pl3 = 255;

describe("Middleware", function() {
  describe("HasPermission", function() {
    it("Should return false if no authentication", function() {
      assert.equal(
        false,
        middleware.permissionLevelRequired();
      );
    });
  });
});
