# IDP project: microservice for interaction with database

## Usage
* Before running anything, make sure you created the network with `docker network create app-network`
* You can check if the network exists with `docker network ls`
* To use the IO service, simply run `docker-compose up --build` inside this folder
* Running the server locally will not work, always run through docker
* To use MongoDB Compass and inspect the database, simply create a new connection
with `mongodb://idp2025:idp2025@localhost:27018/idp2025?authSource=admin`

## Functionality
* Added database and backend functionality, packaged with Docker Compose 
* Added routes for user register and login validation

## Technologies
Express, MongoDB, MongoDB Compass, Typescript, Docker, Docker Compose