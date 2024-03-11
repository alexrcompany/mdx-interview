/**
 * User Controller
 */

const UserModel = require("../../models/users");

/**
 * Creates a new user based on the provided request body.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createUser = (req, res) => {
  const payload = req.body;

  UserModel.createUser(
    Object.assign(payload)
  )
    .then((user) => {
      return res.status(201).json({
        status: true,
        user: user.toJSON(),
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
};

/**
 * Retrieves a user based on the provided user ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getUser = (req, res) => {
  const {
    params: { userId },
  } = req;

  UserModel.findUser({ id: userId })
    .then((user) => {
      return res.status(200).json({
        status: true,
        user: user.toJSON(),
        links: {
          self: `/users/${userId}`
        }
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
};

/**
 * Updates user data based on the provided user ID and request body.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateUser = (req, res) => {
  const {
    params: { userId },
  } = req;

  const {
    body: payload,
  } = req;

  if (!Object.keys(payload).length) {
    return res.status(400).json({
      status: false,
      error: {
        message: "Data is missing in the request body.",
      },
    });
  }

  UserModel.updateUser({ id: userId }, payload)
    .then(() => {
      return UserModel.findUser({ id: userId });
    })
    .then((user) => {
      return res.status(200).json({
        status: true,
        user: user.toJSON(),
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
};

/**
 * Deletes a user based on the provided user ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteUser = (req, res) => {
  const {
    params: { userId },
  } = req;

  UserModel.deleteUser({ id: userId })
    .then((numRows) => {
      if(numRows > 0){
        return res.status(200).json({
          status: true,
        });
      }else{
        return res.status(404).json({
          status: false,
          error: {
            message: 'User could not be deleted.',
          },
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
};

/**
 * Retrieves all users based on the provided query parameters.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllUsers = (req, res) => {
  UserModel.findAllUsers(req.query)
    .then((users) => {
      return res.status(200).json({
        status: true,
        users: users,
        user_count: users.length,
        links: {
          self: '/users',
        }
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
};
