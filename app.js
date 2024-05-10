const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./data/userToken.json");
var db = low(adapter);

const errorController = require("./controllers/error");

// const userModel = require("./models/User");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// Begin Authentication part

const jwtSecretKey = "somerandomaccesstoken";

// The auth endpoint that creates a new user record or logs a user based on an existing record
app.post("/auth", (req, res) => {
  const { username, password } = req.body;

  // Look up the user entry in the database
  const user = db
    .get("users")
    .value()
    .filter((user) => username === user.username);

  // If found, compare the hashed passwords and generate the JWT token for the user
  if (user.length === 1) {
    bcrypt.compare(password, user[0].password, function (_err, result) {
      console.log(user.length);
      if (!result) {
        return res.status(401).json({ message: "Invalid password" });
      } else {
        let loginData = {
          username,
          signInTime: Date.now(),
        };

        const token = jwt.sign(loginData, jwtSecretKey);
        res.status(200).json({ message: "success", token });
      }
    });
    // If no user is found, hash the given password and create a new entry in the auth db with the email and hashed password
  } else if (user.length === 0) {
    bcrypt.hash(password, 10, function (_err, hash) {
      console.log({ username, password: hash });
      db.get("users").push({ username, password: hash }).write();

      let loginData = {
        username,
        signInTime: Date.now(),
      };

      const token = jwt.sign(loginData, jwtSecretKey);
      res.status(200).json({ message: "success", token });
    });
  }
});

// The verify endpoint that checks if a given JWT token is valid
app.post("/verify", (req, res) => {
  const tokenHeaderKey = "jwt-token";
  const authToken = req.headers[tokenHeaderKey];
  try {
    const verified = jwt.verify(authToken, jwtSecretKey);
    if (verified) {
      return res.status(200).json({ status: "logged in", message: "success" });
    } else {
      // Access Denied
      return res.status(401).json({ status: "invalid auth", message: "error" });
    }
  } catch (error) {
    // Access Denied
    return res.status(401).json({ status: "invalid auth", message: "error" });
  }
});

// An endpoint to see if there's an existing account for a given email address
app.post("/check-account", (req, res) => {
  const { username } = req.body;

  console.log(req.body);

  const user = db
    .get("users")
    .value()
    .filter((user) => username === user.username);

  res.status(200).json({
    status: user.length === 1 ? "User exists" : "User does not exist",
    userExists: user.length === 1,
  });
});

// End Authentication part

app.get("/", (req, res) => {
  return res.status(200).json({ status: 200, message: "Welcome to Movie App" });
});

const moviesRoutes = require("./routes/movies");
app.use(moviesRoutes);
app.use(errorController.get404);

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
