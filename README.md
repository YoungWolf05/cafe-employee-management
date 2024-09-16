# Nest MySQL App
This is a NestJS application that uses MySQL as the database. The application is containerized using Docker and can be easily set up and run using Docker Compose.

## Summary

This application demonstrates a basic setup of a NestJS application with a MySQL database. It includes:

- A NestJS server
- A MySQL database
- Docker configuration to containerize the application

## Prerequisites

- Docker
- Docker Compose

## Running the Application

To run the application, use the following commands:

First, start the MySQL database container:

```sh
docker-compose up mysql -d
```

Then, start the NestJS server:

```sh
npm start
```

This setup will start the MySQL database in a container and then start the NestJS server.

## Stopping the Application

To stop the application, use the following command:

```sh
docker-compose down
```

This command will stop and remove the containers created by `docker-compose up`.

## License

This project is licensed under the MIT License.