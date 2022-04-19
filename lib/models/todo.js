'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ToDo.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    author: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ToDo',
  });
  return ToDo;
};