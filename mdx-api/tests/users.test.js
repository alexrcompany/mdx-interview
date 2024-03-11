// Load the proper .env file
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const request = require("supertest");
// Express library
const Express = require("express");
// Initialize the Express application with no parameters
const app = Express();
// Cross-Origin Resource Sharing 
// NOTE: Not used here, * wildcard used, but added to point out
//       basic security concerns. I do not enable it, so you can deploy 
//       this API anywhere and consume it from anywhere else to test it.
const cors = require("cors");
// Sequelize library
// This library is responsible for data storage and we're gonna use it
// with SQLite to make that part easy to manage.
const { Sequelize } = require("sequelize");

// HTTP port settings
// NOTE: I've added it to the config file just to keep things orderly, even
// though we could just use 
// const port = 3000; instead.
const { port } = require("../config/config");

// Set the listeinig port and allow the .env settings to overwrite our config.
const PORT = process.env.PORT || port;

// User routes
const UserRoutes = require("../routes/users");

// User Models
const UserModel = require("../models/users");

// Enable cors in the app with no parameters
// hence: *
app.use(cors());

// Enable JSON parsing of the HTTTP body by the Express application
// I'll be using the raw body of the request and accept JSON objects 
// as the payload.
app.use(Express.json());

// Import Sequelize options from our config file
const { config } = require("../config/config");
const sequelize = new Sequelize(config);

// Initialising the Model on sequelize
UserModel.initialise(sequelize);

app.use("/users", UserRoutes);

// Tests

// Test suite for creating a new user
describe("POST /users", () => {
    // Test case: Should create a new user
    it("Should create a new user", async () => {
        // Send a POST request to create a new user
        const res = await request(app).post("/users").send({
            firstName: "Jennifer",
            lastName: "Doe",
            username: "jenndoe",
            email: "jenn@example.com"
        });
        // Assert that the response status code is 201 (Created)
        expect(res.statusCode).toBe(201);
        // Assert that the first name of the created user matches
        expect(res.body.user.firstName).toBe("Jennifer");
    });
});

// Test suite for updating a user
describe("PUT /users/:id", () => {
    // Test case: Should update user with id:2
    it("Should update user with id:2", async () => {
        // Send a PUT request to update user with id:2
        const res = await request(app).put("/users/2").send({
            firstName: "Alice",
            lastName: "Doe",
        });
        // Assert that the response status code is 200 (OK)
        expect(res.statusCode).toBe(200);
        // Assert that the updated user's first name matches
        expect(res.body.user.firstName).toBe("Alice");
        // Assert that the updated user's last name matches
        expect(res.body.user.lastName).toBe("Doe");
    });
});

// Test suite for getting all users
describe("GET /users", () => {
    // Test case: Should get all users
    it("Should get all users", async () => {
        // Send a GET request to retrieve all users
        const res = await request(app).get("/users");
        // Assert that the response status code is 200 (OK)
        expect(res.statusCode).toBe(200);
    });
});

// Test suite for deleting a user
describe("DELETE /users/:id", () => {
    // Test case: Should delete user with id:3
    it("Should delete user with id:3", async () => {
        // Send a DELETE request to delete user with id:3
        const res = await request(app).delete("/users/3");
        // Assert that the response status code is 200 (OK)
        expect(res.statusCode).toBe(200);
    });
});