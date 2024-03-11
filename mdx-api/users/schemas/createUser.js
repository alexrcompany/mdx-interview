module.exports = {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    email: {
      type: 'string',
      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    }
  },
  required: [
    'username',
    'email',
    'firstName',
    'lastName'
  ],
  additionalProperties: false
};
