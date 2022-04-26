const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const {
  app: { url, urlDescription, version, name }
} = require("../config/app")[process.env.NODE_ENV || "development"];

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: name,
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
