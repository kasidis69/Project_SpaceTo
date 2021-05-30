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
        index: true,
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
        customIndex: true,
        type: Sequelize.INTEGER
      },
      workspacetypeNo: {
        customIndex: true,
        type: Sequelize.INTEGER
      },
      equipmentNameNo: {
        customIndex: true,
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