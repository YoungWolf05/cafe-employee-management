# Cafe Employee Management Service
This is a NestJS application that uses MySQL as the database. The application is containerized using Docker and can be easily set up and run using Docker Compose.

## Summary

This application demonstrates a basic setup of a NestJS application with a MySQL database. It includes:

- A NestJS server
- A MySQL database
- Docker configuration to containerize the application

## Prerequisites

- Docker
- Docker Compose

## Run the Application

To run the application, use the following commands:

```sh
docker compose up --build -d
```

This setup will start the MySQL database container and NestJS server container.

Access Swagger page from localhost:400/api

## Stopping the Application

To stop the application, use the following command:

```sh
docker-compose down
```

This command will stop and remove the containers created by `docker compose up`.
