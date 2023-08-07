'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    let data = require('../data/classes.json').map(e => {
      e.createdAt = e.updatedAt = new Date()
      delete e.id
      return e
    })
    await queryInterface.bulkInsert('Classes', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */
    await queryInterface.bulkDelete('Classes', null, {});
  }
};
