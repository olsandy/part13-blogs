const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'users_reading_list' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users_added_to_list' })

module.exports = {
  Blog,
  User,
}
