'use strict';

require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Moamen',
      lastName: 'Abdelwahed',
      email: 'moomen.abdelwahed@gmail.com',
      password: bcrypt.hashSync('123456', 8),
      token: jwt.sign({id: 1}, process.env.JWT_SECRET, {
        algorithm: "HS256"
      }),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
