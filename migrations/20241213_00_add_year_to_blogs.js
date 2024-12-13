const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [1991],
          msg: 'Year cannot be before 1991.',
        },
        notGreaterThanCurrentYear(value) {
          if (value > new Date().getFullYear()) {
            throw new Error('Year must not be greater than the current year.')
          }
        },
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}
