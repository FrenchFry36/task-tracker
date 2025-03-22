import bcrypt from "bcrypt";
import express from "express";
import { allTasks } from "./data/tasks.js";
import { allUsers } from "./data/users.js";
import { generateJWT } from "./utils/generateJWT.js";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = process.env.PORT || 3333;

// ...existing code...
app.use(express.json());
app.use(cors());

// Read (GET) all tasks
app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  if (allTasks.has(id)) {
    res.json(allTasks.get(id));
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

app.get("/tasks", (req, res) => {
  res.json(Array.from(allTasks.values()));
});

// Update (PUT) a task (full update)

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;

  if (allTasks.has(id)) {
    // Replace the entire task with the new data
    allTasks.set(id, { id, ...updatedTask });
    res.json(allTasks.get(id));
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Create (POST) a new task

app.post("/tasks", (req, res) => {
  const newTask = {
    id: uuidv4(),
    ...req.body,
  };
  allTasks.set(newTask.id, newTask);
  res.status(201).json(newTask);
});

// Delete (DELETE) a task

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  if (allTasks.has(id)) {
    allTasks.delete(id);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Signup endpoint
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (allUsers.has(email)) {
      res.status(400).json({ error: "User already exist!" });
    }
    // encrypt password before storing it in db
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    // create new user object
    const newUser = {
      name: name,
      email: email,
      password: bcryptPassword,
    };

    allUsers.set(email, newUser);

    const jwtToken = generateJWT(newUser.email);
    return res.status(201).send({ jwtToken: jwtToken, isAuthenticated: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: error.message });
  }
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simple demo user validation
  if (username === "demo" && password === "password123") {
    res.json({
      success: true,
      username: "demo",
      name: "Demo User",
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

fetch("http://localhost:3333/tasks")
  .then((response) => response.json())
  .then((data) => console.log(data));
