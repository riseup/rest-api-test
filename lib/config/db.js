module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./lib/db/data/ejemploDB.sqlite3",
    migrationStorageTableName: "sequelize_meta",
    logging: function (str) {
      console.log(str);
    }
  },
  test: {
    dialect: "sqlite",
    storage: "./lib/db/data/ejemploDB.sqlite3",
    migrationStorageTableName: "sequelize_meta",
    logging: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    migrationStorageTableName: "sequelize_meta",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    timezone: "America/Argentina/Buenos_Aires"
  }
};
