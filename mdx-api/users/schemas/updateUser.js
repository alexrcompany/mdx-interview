module.exports = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string'
    }
  },
  required: [
    'firstName',
    'lastName'
  ],
  additionalProperties: false
};
