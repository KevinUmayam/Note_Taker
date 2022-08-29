const express = require("express");
const path = require("path");

const fs = require("fs");
const uuid = require("uuid");
let db = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3005;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//api get
app.get("/api/notes", (req, res) => {
  res.json(db);
});
// html get
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//api post
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  const id = uuid.v4();

  const newNote = { title, text, id };

  db.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(db));
  res.json(db);
});
// delete with id
app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;

  db = db.filter((dNote) => dNote.id !== id);
  res.json(db);
});

// app.put("/api/notes/:id", (req, res) => {
//   const { id } = req.params;
//   const { title, text } = req.body;
//   const updatedNote = { title, text, id };
//   let currentNote = db.find((note) => note.id === id);
//   db.splice(db.indexOf(currentNote), 1, updatedNote);
//   res.json(db);
// });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
