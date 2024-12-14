const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user',
    defaultScope: {
      attributes: { exclude: ['passwordHash'] },
    },
    scopes: {
      withPassword: {
        attributes: {},
      },
    },
    hooks: {
      beforeCreate: (user, options) => {
        user.disabled = false
      },
    },
  }
)

module.exports = User
