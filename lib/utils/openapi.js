const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const { version } = require("../../package.json");
const {
  app: { url, urlDescription }
} = require("../config/app")[process.env.NODE_ENV || "development"];

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rest API ToDo",
      version
    },
    servers: [
      {
        url,
        description: urlDescription
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
