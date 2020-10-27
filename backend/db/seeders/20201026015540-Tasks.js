'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [
      {
        name: "Make your bed",
        description: "Make sure to fluff pillows",
        deadline: "2020-11-20",
        projectId: "1",
        assigneeId: "2",
        creatorId: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Clean out closet",
        description: "Organize clothing",
        deadline: "2020-11-23",
        projectId: "1",
        assigneeId: "1",
        creatorId: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Pack clothing",
        deadline: "2020-10-30",
        projectId: "2",
        assigneeId: "1",
        creatorId: "2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
