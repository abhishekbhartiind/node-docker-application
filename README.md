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
docker ps # shows you running containers
docker ps -a # shows all containers
docker logs node-app # show logs related with docker container, here for "node-app"
docker volume ls # show all volums
```

### Overview of docker file system, we can ignore file with `.dockerignore`

```bash
docker exec -it node-app bash

root@b01f7af73799:/app# ls
Dockerfile  README.md  docs  index.js  node_modules  package-lock.json  package.json  yarn.lock
root@b01f7af73799:/app# exit
```

### MOST USED

```bash
# [build]
docker build -t node-app-image .

# [run]
docker run -p 4000:3000 -d --name node-app node-app-image

# [run container with volume]
docker run -v $(pwd):/app -p 4000:3000 -d --name node-app node-app-image


# [delete container]
docker rm node-app -f

# [delete image]
docker image rm IMAGE_ID
```

### Features

- We build an image with docker file
- Then we build a container from docker image

[stale_updating_data]

- if you change anything after the build, it will not updated
  over docker, as docker images is created before incorporating
  those changes.
- To update, we have to rebuild the docker image

[Volumes]

- Have persisted data
  ```bash
  docker run -v pathdirtolocation:pathdirtocontainer -p 4000:3000 -d --name node-app node-app-image
  ```
- use `nodemon` to have updated express changes

### Run docker with volume

```bash
docker run -v /Users/abhishek/codes/loving/own/node-docker:/app -p 4000:3000 -d --name node-app node-app-image
# or
# Mac - $(pwd)
# Windows - %cd% / ${pwd}
docker run -v $(pwd):/app -p 4000:3000 -d --name node-app node-app-image

# updates in Dockerfile, as we are running from `nodemon`
CMD ["npm", "run", "dev"]
```

### NOTE

- In case, if you delete `node_modules` from local system, docker container will not
  execute
- because in 2nd layer, we have `/app` which sync all the local changes to volume, since
  node_modules is not present in local environment, then there will be issue while running
- to overcome with this problem, we can make use of another container related to node_modules

```bash
docker run -v $(pwd):/app -v /app/node_modules -p 4000:3000 -d --name node-app node-app-image
```

[To make read only bind mount, if we don't care of this... anything you create/update a file it will
also reflect in local environment. which is a security issue]

```bash
# :ro - represent read only file system

docker run -v $(pwd):/app:ro -v /app/node_modules -p 4000:3000 -d --name node-app node-app-image
```

### Setup ENV values in Dockerfile

```bash
ENV PORT 3000
EXPOSE $PORT
```

```bash
# -e / --env
# run on setting -e PORT 4000
docker run -v $(pwd):/app:ro -v /app/node_modules -e PORT=4000 -p 4000:4000 -d --name node-app node-app-image

# run with .env file
docker run -v $(pwd):/app:ro -v /app/node_modules --env-file ./.env  -p 4000:3000 -d --name node-app node-app-image
```

### Delete the preseved volume (prune)

```bash
# v refers to delete volume associated with container

# [delete container with volume]
docker rm node-app -fv

# prune
docker volume prune
```

## Docker Compose

Automate the process of building and running docker

```bash
version: "3"
services:
  node-app:
    build: .
    ports:
      - "4000:3000"
    volumes:
      - ./:app
      - ./app/node_modules
    environment:
      - PORT=3000
    # env_file:
    #   - ./.env
```

```bash
# [BUILD & START THE CONTAINER]
docker-compose up -d # to up container

# [REBUILD THE IMAGE]
docker-compose up -d --build

# [TEARDOWN THE CONTAINER]
docker-compose down # tear down container
docker-compose down -v # tear down container and volumes
```

## Multiple docker-compose files

- Create dev and prod docker-compose yml files
- Base `docker-compose.yml` serves as common features on both files
- run with order

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

# f: refers to file -- first it loads from docker-compose.yml (base file)
# then dev file
# up: build and start docker container
# -d: deteched mode
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v

docker exec -it node-docker_node-app_1 bash
```

## Mongo: Docker Image

[Documentation](https://hub.docker.com/_/mongo)

```bash
version: "3"
services:
  node-app:
    build: .
    ports:
      - "4000:3000"
    volumes:
      - ./:/app
      - ./app/node_modules
    environment:
      - PORT=3000

  mongo:
    image: mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password
```
