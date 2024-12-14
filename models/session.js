const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Session extends Model {}

Session.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'users', key: 'id' },
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'session',
  }
)

module.exports = Session
