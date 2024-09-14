import jwt from "jsonwebtoken";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const todosFilePath = path.join(process.cwd(), "data", "todos.json");
const JWT_SECRET = "your_jwt_secret";

export default async (req, res) => {
  const { method, headers, body } = req;

  try {
    if (method === "GET") {
      const todosData = await readFile(todosFilePath, "utf8");
      const todos = JSON.parse(todosData);
      res.status(200).json(todos);
    } else if (method === "POST") {
      const { token, task } = body;
      const decoded = jwt.verify(token, JWT_SECRET);
      const todosData = await readFile(todosFilePath, "utf8");
      const todos = JSON.parse(todosData);

      todos.push({ task, user: decoded.email });
      await writeFile(todosFilePath, JSON.stringify(todos, null, 2));
      res.status(201).json({ message: "Task added" });
    } else if (method === "DELETE") {
      const { taskId } = body;
      const todosData = await readFile(todosFilePath, "utf8");
      const todos = JSON.parse(todosData);

      const filteredTodos = todos.filter((todo) => todo._id !== taskId);
      await writeFile(todosFilePath, JSON.stringify(filteredTodos, null, 2));
      res.status(200).json({ message: "Task deleted" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error handling todos" });
  }
};
