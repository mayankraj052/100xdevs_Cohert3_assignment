import bcrypt from "bcrypt";
import { writeFile, readFile } from "fs/promises";
import path from "path";

const usersFilePath = path.join(process.cwd(), "data", "users.json");

export default async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Only POST requests allowed" });

  const { email, password } = req.body;

  try {
    const usersData = await readFile(usersFilePath, "utf8");
    const users = JSON.parse(usersData);

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });

    await writeFile(usersFilePath, JSON.stringify(users, null, 2));
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};
