import express from "express";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

const router = express.Router();
const client = new MongoClient(process.env.MONGO_URL);
const dbName = "todo_app";

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("users");

    const hashedPassword = await bcrypt.hash(password, 10);
    await collection.insertOne({ email, password: hashedPassword });

    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  } finally {
    await client.close();
  }
});

export default router;
