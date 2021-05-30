'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workspace_equipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Workspace_equipment.init({
    equipmentNameNo: DataTypes.INTEGER,
    workspaceNo: DataTypes.INTEGER,
    equipmentMaxMount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Workspace_equipment',
  });
  return Workspace_equipment;
};