import bcrypt from "bcrypt";
import express from "express";
import { allTasks } from "./data/tasks.js";
import { allUsers } from "./data/users.js";
import { generateJWT } from "./utils/generateJWT.js";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 3333;

// ...existing code...
app.use(express.json());
app.use(cors());

function authenticate(req, res, next) {
  console.log("middleware starts here");
  // Get token from request headers
  let token = req.header("authorization");

  // Check if token exists
  if (!token) {
    return res
      .status(403)
      .send({ message: "authorization denied", isAuthenticated: false });
  }

  console.log(token);
  token = token.split(" ")[1];

  // Verify token using jwt
  try {
    /* this will return the user id (user:{id: user_id}) which we 
    provided as payload while generating JWT token */
    const verify = jwt.verify(token, process.env.jwtSecret);

    req.user = verify.user;

    console.log("middleware continues here");
    next();
    console.log("middleware ends here");
  } catch (err) {
    res
      .status(401)
      .send({ message: "Token is not valid", isAuthenticated: false });
  }
}

// Read (GET) one task
app.get("/tasks/:id", authenticate, (req, res) => {
  const { id } = req.params;
  if (allTasks.has(id)) {
    res.json(allTasks.get(id));
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Read (GET) all tasks
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
      return res.status(400).json({ error: "User already exist!" });
    }
    // encrypt password before storing it in db
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    // create new user object
    const newUser = {
      name: name,
      email: email,
      salt: salt,
      password: bcryptPassword,
    };

    allUsers.set(email, newUser);

    const jwtToken = generateJWT(newUser.email);
    return res.status(201).send({ jwtToken: jwtToken, isAuthenticated: true });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: error.message });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = allUsers.get(email);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid User", isAuthenticated: false });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res
        .status(401)
        .json({ error: "Invalid User", isAuthenticated: false });
    }

    const jwtToken = generateJWT(user.email);

    return res.status(200).send({ jwtToken, isValidPassword: true });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

fetch("http://localhost:3333/tasks")
  .then((response) => response.json())
  .then((data) => console.log(data));
