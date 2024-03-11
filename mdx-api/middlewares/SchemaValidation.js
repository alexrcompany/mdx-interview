/**
 * JSON Schema Verification Middleware
 * @module JsonSchemaVerification
 */

const Ajv = require('ajv').default;

/**
 * Default options for Ajv instance.
 * @constant {Object} AJV_OPTS
 */
const AJV_OPTS = { allErrors: true };

/**
 * Middleware function to verify request body against a JSON schema.
 * @param {Object} schema - JSON schema to validate against
 * @throws {Error} Throws an error if schema is not provided
 * @returns {Function} Middleware function to be used in Express routes
 */
module.exports.verify = (schema) => {
  /**
   * Express middleware function.
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next callback function
   */
  return (req, res, next) => {
    const { body } = req;
    const ajv = new Ajv(AJV_OPTS);
    const validate = ajv.compile(schema);
    const isValid = validate(body);

    if (isValid) {
      return next();
    }

    return res.send({
      status: false,
      error: {
        message: `Invalid request: ${ajv.errorsText(validate.errors)}`
      }
    });
  };
};
