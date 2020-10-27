'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Projects', [
      {
        name:"Spring Cleaning",
        description: "Deep clean everything!",
        creatorId: "1",
        teamId: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Prep for vacation",
        creatorId: "2",
        teamId: "2",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Projects', null, {});

  }
};
