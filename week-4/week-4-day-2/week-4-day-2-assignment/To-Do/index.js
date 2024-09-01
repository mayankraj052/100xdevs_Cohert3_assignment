const express = require("express");
const app = express();
const port = 3000;

let todos = []; // This will act as our in-memory database

app.use(express.json());

// Function to generate a unique ID
function generateUniqueId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// Route to get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Route to add a new todo
app.post("/todos", (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ message: "Task cannot be empty" });
  }

  const newTodo = {
    id: generateUniqueId(),
    task: task,
    done: false,
    timestamp: new Date().toISOString(),
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Route to update the status of a todo
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.done = done;
  res.json(todo);
});

// Route to delete a specific todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id !== id);
  res.status(204).send();
});

// Route to delete all todos
app.delete("/todos", (req, res) => {
  todos = [];
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
