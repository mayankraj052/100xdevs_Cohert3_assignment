import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { readFile } from "fs/promises";
import path from "path";

const usersFilePath = path.join(process.cwd(), "data", "users.json");
const JWT_SECRET = "your_jwt_secret";

export default async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Only POST requests allowed" });

  const { email, password } = req.body;

  try {
    const usersData = await readFile(usersFilePath, "utf8");
    const users = JSON.parse(usersData);

    const user = users.find((user) => user.email === email);
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error during authentication" });
  }
};
