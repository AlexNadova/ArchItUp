module.exports = {
  security: {
    // Secret key for signing and decoding the token
    SECRETKEY: "bestsecretever",

    // expiresIn: expressed in seconds or a string describing a time span.
    TOKEN_EXP: "1h"
    //TOKEN_ACTIVE_AFTER: "1h"
  },

  // See file PermissionLevels.txt
  permissionLevels: {
    // Required permission levels
    VISITORS: 1, // Bitwise: 00000001
    REG_USER: 4, // Bitwise: 00000100
    ADMIN: 128, // Bitwise: 10000000

    // Registered users default permission value.
    DEFAULT_USER: 7 // 00000111
  },
  database: {
    // Connection String
    MONGODB:
      "mongodb+srv://alexandranadova:3%21CdyHpfRMofUEkgvNg@tester-yssrq.mongodb.net/ArchItUp"
  }
};
