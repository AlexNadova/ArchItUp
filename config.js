module.exports = {
  security: {
    SECRETKEY: "bestsecretever",
    /* expiresIn: expressed in seconds or a string describing a time span - https://github.com/zeit/ms
    A numeric value is interpreted as a seconds count (60).
    If you use a string be sure you provide the time units ("2 days", "1 hours", "2d", "1h"  ),
    otherwise milliseconds unit is used by default ("120" is equal to "120ms"). */
    TOKEN_EXP: "1h"
    /* If notBefore: is 3000, then the token cannot be used before 3 seconds of creation. 
    This makes a brute force attack nearly impossible.*/
    //TOKEN_ACTIVE_AFTER: "1h"
  },
  permissionLevels: {
    VISITORS: 1, // Bitwise: 00000001
    REG_USER: 4, // Bitwise: 00000100
    ADMIN: 128   // Bitwise: 10000000

    //Users Examples
    /*An admin can then have all permissions by setting their permission value to  2147483647 = 1111111111111111111111111111111 
    A user whose permission value was set to 7 (00000111) would have permissions to the roles marked with bits for values 1(00000001), 2(00000010), and 4(00000100)*/
  },
  database: {
    MONGODB:
      "mongodb+srv://alexandranadova:3%21CdyHpfRMofUEkgvNg@tester-yssrq.mongodb.net/ArchItUp"
  }
};
