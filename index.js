const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send(
    "<div><h2>Node Docker </h2><br /><p>Lovely docker tutorial</p></div>"
  )
})

app.listen(PORT, () => {
  console.log("Node Docker Application is running")
})
