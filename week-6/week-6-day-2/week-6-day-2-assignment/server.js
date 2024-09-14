const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Import UUID for generating unique IDs

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const USERS_FILE = path.join(__dirname, "data", "users.json");
const TODOS_FILE = path.join(__dirname, "data", "todos.json");

const readFile = (filePath) => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

const writeFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/signup", (req, res) => {
  const { email, password } = req.body;
  const users = readFile(USERS_FILE);
  const userExists = users.find((user) => user.email === email);

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ email, password: hashedPassword });
  writeFile(USERS_FILE, users);

  res.status(201).json({ message: "User registered successfully" });
});

app.post("/api/auth", (req, res) => {
  const { email, password } = req.body;
  const users = readFile(USERS_FILE);
  const user = users.find((user) => user.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ email }, "your-secret-key", { expiresIn: "1h" });
  res.json({ token });
});

app.post("/api/todos", (req, res) => {
  const { token, task } = req.body;
  try {
    const decoded = jwt.verify(token, "your-secret-key");
    const todos = readFile(TODOS_FILE);
    todos.push({ _id: uuidv4(), email: decoded.email, task }); // Add unique ID
    writeFile(TODOS_FILE, todos);
    res.status(201).json({ message: "Task added" });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.get("/api/todos", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "your-secret-key");
    const todos = readFile(TODOS_FILE).filter(
      (todo) => todo.email === decoded.email
    );
    res.json(todos);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.delete("/api/todos", (req, res) => {
  const { token, taskId } = req.body;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token and extract user information
    const decoded = jwt.verify(token, "your-secret-key");
    const email = decoded.email;

    // Read and filter tasks
    let todos = readFile(TODOS_FILE);
    todos = todos.filter(
      (todo) => !(todo.email === email && todo._id === taskId)
    );

    // Write the updated tasks back to the file
    writeFile(TODOS_FILE, todos);

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Token verification failed:", err); // For debugging
    res.status(401).json({ message: "Invalid token" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
