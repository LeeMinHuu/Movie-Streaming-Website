const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "userToken.json"
);

const userToken = {
  all: function () {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  },
};

module.exports = class User {
  contructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static getUser() {
    return userToken.all();
  }
};
