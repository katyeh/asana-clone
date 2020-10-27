'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teams', [
      {
        name: "Demo Team",
        creatorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Kathleen's Team",
        creatorId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Teams', null, {});

  }
};
