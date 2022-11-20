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

## Docker

A platform for building, running and shipping applications in a consistent
manner.

```bash
# Dockerfile

# All the commands mentioned here considered as layer in docker image
# for us it has 5 layers / steps to build ultimate image

FROM node:15 # Set the baseImage
WORKDIR /app # Set the working directory of our container (optional)
COPY package.json . # copy it in relative to /app
RUN npm install # (when we build container)
COPY . ./
EXPOSE 3000 # it expose port 3000
CMD ["node", "index.js"] # tell container what to run (when we run container)
```

```bash
docker build
```
