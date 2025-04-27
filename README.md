# IDP project: microservice for interaction with database

## Usage
* First, build the image with `docker build -t io-backend:latest ./io-backend`
* Before running anything, make sure you created the network with `docker network create --driver overlay --scope swarm app-network`
* You can check if the network exists with `docker network ls`
* To use the IO service, simply run `docker stack deploy -c docker-compose.yml io_stack` inside this folder after the previous steps
* Running the server locally will not work, always run through docker
* To use MongoDB Compass and inspect the database, simply create a new connection
with `mongodb://idp2025:idp2025@localhost:27018/idp2025?authSource=admin`

## Functionality
* Added database and backend functionality, packaged with Docker Compose 
* Added routes for user register and login validation

## Technologies
Express, Typescript, MongoDB, MongoDB Compass, Docker, Docker Compose, Docker Swarm