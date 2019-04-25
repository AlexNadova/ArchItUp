module.exports = {
  security: {
    SECRETKEY: "bestsecretever" // JWT_KEY: "secretTokenKey"
  },
  permissionLevels: {
    NORMAL_USER: 1, // Bitwise: 0
    RAID_USER: 4,   // Bitwise: 100
    ADMIN: 2048     // Bitwise: 100000000000
  },
  database: {
    //database: "mongodb://noder:noderauth&54;proximus.modulusmongo.net:27017/so9pojyN"
  }
};
