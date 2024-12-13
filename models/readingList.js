const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ReadingList extends Model {}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'users', key: 'id' },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'blogs', key: 'id' },
    },
    state: {
      type: DataTypes.STRING(6),
    },
  },
  {
    hooks: {
      beforeCreate: (readingList, options) => {
        readingList.state = 'unread'
      },
    },
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'readingList',
  }
)

module.exports = ReadingList
