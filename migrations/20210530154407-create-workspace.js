'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Workspaces', {
      workspaceNo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      workspaceName: {
        type: Sequelize.STRING
      },
      locationNo: {
        unique: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.TEXT
      },
      timeOpenClose: {
        type: Sequelize.INTEGER
      },
      adminNo: {
        unique: true,
        type: Sequelize.INTEGER
      },
      workspacetypeNo: {
        unique: true,
        type: Sequelize.INTEGER
      },
      equipmentNameNo: {
        unique: true,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Workspaces');
  }
};