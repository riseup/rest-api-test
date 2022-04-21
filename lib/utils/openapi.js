const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const { version } = require("../../package.json");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rest API ToDo",
      version
    },
    servers: [
      {
        url: "https://demo-rest-server.herokuapp.com",
        description: "Production server"
      },
      {
        url: "http://localhost:8080",
        description: "Development server"
      }
    ],
    components: {
      securitySchema: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [`${path.join(__dirname, "../routes/*.js")}`]
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = { swaggerSpec };
