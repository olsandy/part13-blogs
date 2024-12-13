const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ReadingList extends Model {}

ReadingList.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
