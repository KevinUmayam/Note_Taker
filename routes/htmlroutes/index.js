//after '/:id' = dynamic parametere for users

const router = require("express").Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

router.post("/", (req, res) => {});
module.export = router;
