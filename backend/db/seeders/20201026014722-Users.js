'use strict';

const bcrypt = require('bcryptjs');

function createPassword() {
  return bcrypt.hashSync('password');
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        fullName: "John Doe",
        email: "john@doe.com",
        picUrl: "https://media.fromthegrapevine.com/assets/images/2017/1/jeff-bridges-dude.jpg.839x0_q71_crop-scale.jpg",
        hashedPassword: createPassword(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: "Kathleen Yeh",
        email: "kathleen@yeh.com",
        picUrl: "https://miro.medium.com/fit/c/128/128/1*02N7QU6pjxuAZmBh-laQWA.jpeg",
        hashedPassword: "$2b$10$lYAdho1ns2ChPIAzLfv/depkJjlCXbMy9a62VmiolZFb/TtibcudS",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});

  }
};
