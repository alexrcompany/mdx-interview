/**
 *  Task 2: API Development
 * 
 *  Author: Alex Andreu
 *  Date: 03/08/2024
 *  Description: Example implmentation as per the assigment requirements.
 *  See: README.md.
 */

// Set a default environment if non passed over cross-env
if(!process.env.NODE_ENV){
  process.env.NODE_ENV = 'development';
}
// Load the proper .env file
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

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

// Swagger tools
const bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");


// Import Swagger options from our config file
const { swaggerOptions } = require("./config/config"); 
// Initialize the options for our Swagger documentation
const specs = swaggerJsdoc(swaggerOptions);

// HTTP port settings
// NOTE: I've added it to the config file just to keep things orderly, even
// though we could just use 
// const port = 3000; instead.
const { port } = require("./config/config");

// Set the listeinig port and allow the .env settings to overwrite our config.
const PORT = process.env.PORT || port;

// User routes
const UserRoutes = require("./routes/users");

// User Models
const UserModel = require("./models/users");

// Enable cors in the app with no parameters
// hence: *
app.use(cors());

// Add the Swagger documentation to the Express app
app.use(
  "/api-docs",  // Url where the documentation will be served
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// Enable JSON parsing of the HTTTP body by the Express application
// I'll be using the raw body of the request and accept JSON objects 
// as the payload.
app.use(Express.json());

// Import Sequelize options from our config file
const { config  } = require("./config/config"); 

const sequelize = new Sequelize(config);

// Initialising the Model on sequelize
UserModel.initialise(sequelize);

// Sync the sequelize models with whatever is already in the database 
// and create the models if not there, or no database file is found.
sequelize
  .sync()
  .then(() => {
    console.log("SQLize is running...");

    // Routing
    // Attach user routes to the app.
    app.use("/users", UserRoutes);

    // Listen on the port specified by ENV or config.js
    app.listen(PORT, () => {
      console.log("Server listening on PORT:", port);
    });

  })
  .catch((err) => {
    // Throw and error and exit the app if it fails, as the API won't work otherwise.
    console.error("SQLize failed to initialize with error:", err);
    process.exit(1); // Exit the app as the API can't work without a permanent storage. Non-zero value added for clarification.
  });
