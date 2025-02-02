const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors")

app.use(cors({
  origin: "http://localhost:5173", credentials: true
}))

let data = 0;

app.get("/data", (req, res) => {
  res.json(data);
});

app.get("/data", (req, res) => {
  res.json({ name: "name" });
});

app.post("/update", (req, res) => {
  console.log(res.text);
  data = res.text;
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
