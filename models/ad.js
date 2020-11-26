'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.category = this.belongsTo(models.Category, {foreignKey: 'categoryId'});
      this.tags = this.belongsToMany(models.Tag, { through: 'Ads_Tags', foreignKey: 'tagId' });
      this.advertiser = this.belongsTo(models.User, {foreignKey: 'advertiser'});
    }
  };
  Ad.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    isFree: DataTypes.DECIMAL,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    photo: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Ad',
  });
  return Ad;
};
