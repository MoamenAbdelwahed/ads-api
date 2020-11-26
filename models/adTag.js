'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.ad = this.belongsTo(models.Ad, {foreignKey: 'adId'});
      this.tag = this.belongsTo(models.Ad, {foreignKey: 'tagId'});
    }
  };
  AdTag.init({
  }, {
    sequelize,
    modelName: 'AdTag',
    tableName: 'Ads_Tags'
  });
  return AdTag;
};
