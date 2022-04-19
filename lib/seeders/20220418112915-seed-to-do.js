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
      "ToDos",
      [
        {
          name: "Snoop",
          description: "Dog",
          date: new Date().toDateString(),
          author: "snoopydog@dogpound.com",
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
        },
        {
          name: "Scooby",
          description: "Doo",
          date: new Date().toDateString(),
          author: "scooby.doo@misterymachine.com",
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
        },
        {
          name: "Herbie",
          description: "Husker",
          date: new Date().toDateString(),
          author: "herbie.husker@unl.edu",
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
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
    return queryInterface.bulkDelete("ToDos", null, {});
  }
};
