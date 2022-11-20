const express = require("express")
const app = express()

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
      </ul>
    </div>`
  )
})

app.listen(PORT, () => {
  console.log("Node Docker Application is running")
})
