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
      date: {
        type: DataTypes.DATE
        // type: DataTypes.DATEONLY,
        // get() {
        //   console.log(this.getDataValue("date"))
        //   return new Date(this.getDataValue("date"))
        // }
      },
      author: DataTypes.STRING
      // createdAt: {
      //   field: "created_at",
      //   type: DataTypes.DATE
      // },
      // updatedAt: {
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
