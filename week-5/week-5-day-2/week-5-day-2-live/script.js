// script.js

const express = require("express");
const path = require("path");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// POST route to calculate sum
app.post("/sum", (req, res) => {
  const { a, b } = req.body;

  // Parse the input values to numbers
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  // Check if inputs are valid numbers
  if (isNaN(numA) || isNaN(numB)) {
    return res
      .status(400)
      .json({ error: "Invalid input. Please enter valid numbers." });
  }

  const sum = numA + numB;

  // Respond with the sum
  res.json({ answer: sum });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
