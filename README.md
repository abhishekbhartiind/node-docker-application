# NodeJS, Docker Application

## Basic NodeJS Setup

```bash
const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("<h2>Node Docker</h2>")
})

app.listen(PORT, () => {
  console.log("Node Docker Application is running")
})

```
