const express = require('express')
const bodyParser = require("body-parser")
const http = require("http")
const app = express()
const port = 3000

app.use(bodyParser.urlencoded())

app.get('/', (req, res) => {
    var options = {
        host: "script.google.com",
        port: 80,
        path: "/macros/s/AKfycbysKrl6-8NcMOPytZgh-_dWFGPjl-GKabV2N98HzYGCZWJMy4oD3Mx7sDm1qT8ju--QWg/exec"
      };
      http.get(options, function(res) {
        console.log("\n---Object.keys(res)---\n"
            + Object.keys(res)
            + "\n---Object.keys(res.headers)---\n"
            + Object.keys(res.headers)
            + "\n---res.headers.['content-type']---\n"
            + Object.keys(res.headers.location))
      }).on('error', function(e) {
        console.log("Got error: " + e.message);
      });
    // fetch("https://script.google.com/macros/s/AKfycbysKrl6-8NcMOPytZgh-_dWFGPjl-GKabV2N98HzYGCZWJMy4oD3Mx7sDm1qT8ju--QWg/exec").then((resp) => {res.send(resp);console.log(resp)})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})