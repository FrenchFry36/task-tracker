import express from "express";
import pkg from "pg";
import cors from "cors";
const { Pool } = pkg;

const app = express();

app.use(express.json());
app.use(cors());

const db = new Pool({
  user: "saidumarakbarov", // replace with you username
  host: "localhost",
  database: "task-tracker",
  password: "",
  port: 5432,
});

// READ ALL
app.get("/tasks", function (req, res) {
  db.query("SELECT * FROM tasks")
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

// READ ONE
app.get("/tasks/:id", function (req, res) {
  const { id } = req.params;

  db.query("SELECT * FROM tasks WHERE id = $1", [id])
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

// CREATE
app.post("/new-task", (req, res) => {
  const { title, priority, release_date, assigned_to, project_name } = req.body;

  const insertQuery = `
    INSERT INTO tasks (title, priority, release_date, assigned_to, project_name)
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *`;

  db.query(insertQuery, [
    title,
    priority,
    release_date,
    assigned_to,
    project_name,
  ])
    .then((result) => {
      res.status(201).json(result.rows[0]); // Return the inserted task
    })
    .catch((error) => {
      console.log(error);
    });
});

// DELETE
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id])
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({ message: "Customer not found" });
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => {
      console.error("Error deleting customer:", error);
      res.status(500).send("Failed to delete customer");
    });
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
