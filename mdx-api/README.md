# Task 2: API Development

Your task is to implement a solution in Node.js. You may use any external libraries or packages if necessary. Please ensure that your solution is well-documented, efficient, and follows best practices for Node.js development.

Please use docker for this project

Design and implement a simple RESTful API using Node.js and Express.js. The API should include the following endpoints:

- GET /api/users: Retrieve a list of users
- POST /api/users: Create a new user
- GET /api/users/:id: Retrieve a specific user by ID 
- PUT /api/users/:id: Update an existing user by ID DELETE /api/users/:id: Delete a user by ID

You may use any data storage solution (e.g., in-memory storage, MongoDB, etc.) to persist user data. Ensure that your API follows RESTful principles, includes error handling, input validation, and proper documentation (e.g., using Swagger or OpenAPI).

Please make sure to include also testing

## Project Structure
- index.js: The main entry point of the application.
- config
  - config.js: Configuration files for the application.
- users
  - controllers: Controller files for user CRUD endpoints
  - schemas: JSON Schemas for body request validation
- middlewares: Middleware for input validation.
- models: Sequelize models for the user table
- routes: Registers all the user CRUD routes.
- sqlite: Local storage for SQLite tables.
- migrations: Contains the migrations used for testing as for dev, we just create the db at sync time, should obviously
              be used through the lifetime of the application, but this is just an example.
- seeders: Used to seeed the testing database after migrating it, so that tests works with consistent data
- tests: Contains the users endpoints tests with jest


## Prerequisites
1. NodeJS (>=v18)
2. NPM (>=v9)

## Installation
1. Clone the repository
2. Navigate to the project directory
3. Install the dependencies: 
```shell
npm install
```

## Usage
The API with no data and create a new db file if none is already present. You can play around by creating users,
deleting them and so on. To start the service, run the following command:
```shell
npm run start
```

## Testing
To run the tests on the application, run the following command:
```shell
npm run test
```

## Docker
Please notice you'll need to have docker installed for this to run. 
Once you've build the container use the name of the image instead of IMAGE_NAME 
and then deploy the container by running:
```shell
docker run --name mdx_api -p 8080:3000 IMAGE_NAME
```
