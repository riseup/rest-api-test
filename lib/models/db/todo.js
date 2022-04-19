"use strict";
const { Model } = require("sequelize");
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
  ToDo.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      date: DataTypes.DATE,
      author: DataTypes.STRING,
      // created_at: {
      //   field: "created_at",
      //   type: DataTypes.DATE
      // },
      // updated_at: {
      //   field: "updated_at",
      //   type: DataTypes.DATE
      // }
    },
    {
      sequelize,
      modelName: "ToDo",
      tableName: "to_do",
      timestamps: false
    }
  );
  return ToDo;
};
