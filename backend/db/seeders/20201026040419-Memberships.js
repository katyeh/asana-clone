'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Memberships', [
      {teamId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {teamId: 1, userId: 2, createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Memberships', null, {});
  }
};
