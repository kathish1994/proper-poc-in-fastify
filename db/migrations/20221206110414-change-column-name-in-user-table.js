"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn("users", "token", "access_token");
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn("users", "token", "access_token");
  },
};
