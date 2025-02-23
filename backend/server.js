import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "blog_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
    return;
  }
  console.log("Connected to MySQL Database!");
});
// to get all posts
app.get("/posts", (req, res) => {
    const sql = "SELECT * FROM posts ORDER BY created_at DESC";
    db.query(sql, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    });
  });

 //to post 

 app.post("/posts", (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Title and content are required" });
  
    const sql = "INSERT INTO posts (title, content) VALUES (?, ?)";
    db.query(sql, [title, content], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Post created successfully", postId: result.insertId });
    });
  });
  
//to update

app.put("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Title and content are required" });
  
    const sql = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
    db.query(sql, [title, content, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Post updated successfully" });
    });
  });

// to delete

app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM posts WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Post deleted successfully" });
    });
  });
  
  //for a specific  
  app.get("/posts/:id", (req, res) => {
    const sql = "SELECT * FROM posts WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      result.length ? res.json(result[0]) : res.status(404).json({ error: "Post not found" });
    });
  });
  

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
