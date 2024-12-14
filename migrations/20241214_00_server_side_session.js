const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'disabled', {
      type: DataTypes.BOOLEAN,
    })

    await queryInterface.createTable('sessions', {
      user_id: {
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
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'disabled')
    await queryInterface.dropTable('sessions')
  },
}
