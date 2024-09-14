import express from "express";
import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";

const router = express.Router();
const client = new MongoClient(process.env.MONGO_URL);
const dbName = "todo_app";

router.post("/", async (req, res) => {
  const { token, task } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await client.connect();
    const db = client.db(dbName);
    const todos = db.collection("todos");

    await todos.insertOne({ task, email: decoded.email });
    res.status(201).json({ message: "Task added" });
  } catch (error) {
    res.status(500).json({ message: "Error adding task" });
  } finally {
    await client.close();
  }
});

router.get("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await client.connect();
    const db = client.db(dbName);
    const todos = db.collection("todos");

    const tasks = await todos.find({ email: decoded.email }).toArray();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  } finally {
    await client.close();
  }
});

router.delete("/", async (req, res) => {
  const { taskId } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await client.connect();
    const db = client.db(dbName);
    const todos = db.collection("todos");

    await todos.deleteOne({
      _id: new MongoClient.ObjectId(taskId),
      email: decoded.email,
    });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  } finally {
    await client.close();
  }
});

export default router;
