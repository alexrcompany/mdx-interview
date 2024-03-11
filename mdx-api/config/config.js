require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

let config = {
  dialect: "sqlite",
  storage: process.env.DB,
  logging: false
};

module.exports = {
  port: 3000,
  swaggerOptions: {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Task 2: API Development",
        version: "1.0.0",
        description:
          "Your task is to implement a solution in Node.js. You may use any external libraries or packages if necessary. \
          Please ensure that your solution is well-documented, efficient, and follows best practices for Node.js development.",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  },
  config: config,
  test: config,
  development: config
}
