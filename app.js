const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;


// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Create a new SQLite database
const db = new sqlite3.Database(":memory:");

// Initialize the messages table
db.run("CREATE TABLE messages (id INTEGER PRIMARY KEY, content TEXT)");

// Include necessary middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API endpoint to get all chat messages
app.get("/api/messages", (req, res) => {
    db.all("SELECT * FROM messages", [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// API endpoint to add a new chat message
app.post("/api/messages", (req, res) => {
    const { content } = req.body;

    if (!content) {
        res.status(400).json({ error: "Message content is required" });
        return;
    }

    const sql = "INSERT INTO messages (content) VALUES (?)";
    db.run(sql, [content], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, content });
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });