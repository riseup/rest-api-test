"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert(
      "to_do",
      [
        {
          name: "Snoop",
          description: "Dog",
          date: new Date(),
          author: "snoopydog@dogpound.com"
          // created_at: new Date(),
          // updated_at: new Date()
        },
        {
          name: "Scooby",
          description: "Doo",
          date: new Date(),
          author: "scooby.doo@misterymachine.com"
          // created_at: new Date(),
          // updated_at: new Date()
        },
        {
          name: "Herbie",
          description: "Husker",
          date: new Date(),
          author: "herbie.husker@unl.edu"
          // created_at: new Date(),
          // updated_at: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("to_do", null, {});
  }
};
