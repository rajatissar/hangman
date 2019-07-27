const express = require("express");
const path = require("path");
const PORT = 3014;

const app = express();

// For rendering static webpage on localhost
app.use(express.static(__dirname));

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "hangman.html"));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Hangman Game is running at port no: ${PORT}`);
});
