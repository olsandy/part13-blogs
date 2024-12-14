const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkUpdate('users', { disabled: false }, {})
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'disabled')
    await queryInterface.dropTable('sessions')
  },
}
