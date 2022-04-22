"use strict";
const Sequelize = require("sequelize");

module.exports = {
  /**
   *
   * @param {Object} queryInterface
   * @param {Sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("to_do", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
        // type: Sequelize.DATEONLY,
        // defaultValue: Sequelize.NOW
      },
      author: {
        allowNull: false,
        type: Sequelize.STRING
      }
      // created_at: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      // updated_at: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("to_do");
  }
};
