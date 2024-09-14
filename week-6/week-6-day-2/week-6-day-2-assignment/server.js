import express from "express";
import bodyParser from "body-parser";
import signup from "./pages/api/signup.js";
import auth from "./pages/api/auth.js";
import todos from "./pages/api/todos.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/api/signup", signup);
app.use("/api/auth", auth);
app.use("/api/todos", todos);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
