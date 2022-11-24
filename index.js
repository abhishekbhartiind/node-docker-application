const express = require("express")
const mongoose = require("mongoose")
const app = express()

mongoose
  .connect("mongodb://abhishek:mypassword@mongo:27017/?authSource=admin")
  .then(() => {
    console.log("Successfully connected to docker mongo db")
  })
  .catch((err) => {
    console.log("error connecting", err)
  })

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send(
    `<div>
      <h2>Node Docker </h2>
      <br />
      <p>Lovely docker tutorial</p>
      <ul>
        <li>Create a docker image and container</li>
        <li>build an image</li>
        <li>run the container on particular image</li>
        <li>add docker volumes to persist changes from local to docker container</li>
        <li>setting up environment variable</li>
        <li>delete the volume associated with container</li>
        <li>introducing docker-compose to automate build and up container</li>
        <li>multiple docker file based upon environment</li>
      </ul>
    </div>`
  )
})

app.listen(PORT, () => {
  console.log("Node Docker Application is running")
})
