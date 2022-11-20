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
docker build . # build docker image
docker image ls # list of all docker images
docker image rm IMAGE_ID # delete docker image
docker build -t node-app-image . # build docker image with name
docker run -d node-app-image # run docker with predefined name
docker run -d --name node-app node-app-image # run docker in detched mode with specific name
docker ps # check all the containers
docker rm node-app -f # force fully removed docker
docker run -p 4000:3000 -d --name node-app node-app-image
# run docker in detched mode with specific name
# with port `-p 4000:3000` 4000: run docker file and 3000: for node application
docker exec -it node-app bash
```

Overview of docker file system, we can ignore file with `.dockerignore`

```bash
docker exec -it node-app bash

root@b01f7af73799:/app# ls
Dockerfile  README.md  docs  index.js  node_modules  package-lock.json  package.json  yarn.lock
root@b01f7af73799:/app# exit
```

MOST USED

```bash
# [build]
docker build -t node-app-image .

# [run]
docker run -p 4000:3000 -d --name node-app node-app-image

# [delete container]
docker rm node-app -f

# [delete image]
docker image rm IMAGE_ID
```

- We build an image with docker file
- Then we build a container from docker image

[stale_updating_data]

- if you change anything after the build, it will not updated
  over docker, as docker images is created before incorporating
  those changes.
- To update, we have to rebuild the docker image

[Volumes]
