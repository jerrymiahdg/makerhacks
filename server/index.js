const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors")
const bodyParser = require('body-parser')

// app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.text())

app.use(cors({
  origin: "http://localhost:5173", credentials: true
}))

let data = 0;

app.get("/data", (req, res) => {
  res.json(data);
});

app.post("/update", (req, res) => {
  console.log(req.body);
  data = req.body;
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
