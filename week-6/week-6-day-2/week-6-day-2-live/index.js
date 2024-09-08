const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "harkirat123";

const app = express();
app.use(express.json());
const path = require("path");

const users = [];

function logger(req, res, next) {
  console.log(req.method + " request came");
  next();
}

// Serve static files (HTML, CSS, JS) from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/signup", logger, function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  users.push({
    username: username,
    password: password,
  });

  // we should check if a user with this username already exists

  res.json({
    message: "You are signed in",
  });
});

app.post("/signin", logger, function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      foundUser = users[i];
    }
  }

  if (!foundUser) {
    res.json({
      message: "Credentials incorrect",
    });
    return;
  } else {
    const token = jwt.sign(
      {
        username: foundUser.username, // Correct username here
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
  }
});

function auth(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1]; // Correct token extraction
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData.username) {
      req.username = decodedData.username;
      next();
    }
  } catch (error) {
    res.status(403).json({
      message: "Token is invalid",
    });
  }
}

app.get("/me", logger, auth, function (req, res) {
  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === req.username) {
      foundUser = users[i];
    }
  }

  if (!foundUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    username: foundUser.username,
    password: foundUser.password,
  });
});

app.listen(3000, (req, res) => {
  console.log("server started at port 3000");
});
