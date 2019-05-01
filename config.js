module.exports = {
  security: {
    SECRETKEY: "bestsecretever", // JWT_KEY: "secretTokenKey",
    //SECRETKEY_EXP: "h1"
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
    //database: "mongodb://noder:noderauth&54;proximus.modulusmongo.net:27017/so9pojyN"
  }
};
