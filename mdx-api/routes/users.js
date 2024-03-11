/** 
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - firstName
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *       example:
 *         id: 302
 *         username: johndoe
 *         email: johndoe@definetely-apple.com
 *         firstName: John
 *         lastName: Doe
 *   tags:
 *     name: Users
 *     description: API endpoints user management
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Successfully created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * /users/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to get
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Successfully updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       '200':
 *         description: Successfully deleted user
 */

// Use the router implementation from Express
const router = require("express").Router();

// Middlewares
// This could be used for authentication, role management, etc...
// Due to how simple this API is we just add the input validation to it
// by using the AJV library.
const MWSchemaValidation = require("../middlewares/SchemaValidation");

// Controllers
const UserController = require("../users/controllers/UserController");

// Schemas
// This schemas define the data structure for our user object
// and will be used to validate the payload received over the endpoints

// Data structure for create user requests
const createUserSchema = require("../users/schemas/createUser");
// Data structure for update user requests
const updateUserSchema = require("../users/schemas/updateUser");

// Routing

// Get all users
router.get("/",UserController.getAllUsers);
// Get user by id
router.get("/:userId", UserController.getUser);
// Create a new user
router.post("/", [MWSchemaValidation.verify(createUserSchema)], UserController.createUser);
// Modify and existing user
// NOTE: As the assigment called for a PUT instead of a PATCH I did made all fields required in this case
router.put("/:userId",[MWSchemaValidation.verify(updateUserSchema)],UserController.updateUser);
// Delete user by id
router.delete("/:userId", UserController.deleteUser);


module.exports = router;
