import bcrypt from "bcrypt";
import express from "express";
const app = express();
const port = process.env.PORT || 3333;
import { allTasks } from "./data/tasks.js";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

// ...existing code...
app.use(express.json());
app.use(cors());

// Read (GET) all tasks

app.get("/tasks", (req, res) => {
  res.json(Array.from(allTasks.values()));
});

// Update (PUT) a task (full update)

app.put("/tasks/:id", authenticate, (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;

  const task = allTasks.get(id);
  if (task) {
    const owner = task.owner;
    if (owner !== req.user.email) {
      return res.status(403).json({ message: "Go away!" });
    }

    allTasks.set(id, { id, ...updatedTask });
    return res.json(allTasks.get(id));
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
});

// Create (POST) a new task

app.post("/tasks", authenticate, (req, res) => {
  const newTask = {
    id: uuidv4(),
    owner: req.user.email,
    ...req.body,
  };
  allTasks.set(newTask.id, newTask);
  return res.status(201).json(newTask);
});

// Delete (DELETE) a task

app.delete("/tasks/:id", authenticate, (req, res) => {
  const { id } = req.params;
  const task = allTasks.get(id);
  if (task) {
    const owner = task.owner;
    if (owner !== req.user.email) {
      return res.status(403).json({ message: "Go away!" });
    }

    allTasks.delete(id);
    return res.status(204).end();
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
});

// Sign up endpoint
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (allUsers.has(email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = bcrypt.genSaltSync(10);
  const bcryptPassword = bcrypt.hashSync(password, salt);

  const user = {
    name,
    email,
    password: bcryptPassword,
  };

  allUsers.set(email, user);

  // generate jwt and return it
  const jwt = generateJWT(user.email);
  return res.status(201).json({ jwt, isAuthenticated: true, user });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
