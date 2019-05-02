module.exports = {
  security: {
    SECRETKEY: "bestsecretever",
    /* expiresIn: expressed in seconds or a string describing a time span - https://github.com/zeit/ms
    A numeric value is interpreted as a seconds count (60).
    If you use a string be sure you provide the time units ("2 days", "1 hours", "2d", "1h"  ),
    otherwise milliseconds unit is used by default ("120" is equal to "120ms"). */
    TOKEN_EXP: "1h",
    /* If notBefore: is 3000, then the token cannot be used before 3 seconds of creation. 
    This makes a brute force attack nearly impossible.*/
    //TOKEN_ACTIVE_AFTER: "1h"
  },
  permissionLevels: {
    // PUBLIC - For registration
    NORMAL_USER: 1, // Bitwise: 0
    // Private - For logged-in user and for admins to update that user
    REG_USER: 4, // Bitwise: 100
    // Private - for Admin only for removing users account
    ADMIN: 2048 // Bitwise: 100000000000
  },
  database: {
    MONGODB:
      "mongodb+srv://alexandranadova:3%21CdyHpfRMofUEkgvNg@tester-yssrq.mongodb.net/ArchItUp"
  }
};
