"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.changeColumn("users", "access_token", {
      type: Sequelize.TEXT,
    }),
  down: async (queryInterface, Sequelize) => Promise.resolve(),
};
