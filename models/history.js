'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  History.init({
    history_id: DataTypes.INTEGER,
    ply_score: DataTypes.INTEGER,
    comp_score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'History',
  });

  History.associate = function(models) {
    History.belongsTo(models.User, {
      foreignKey: 'history_id'
    });
  };
  return History;
};