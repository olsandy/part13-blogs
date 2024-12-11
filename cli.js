require('dotenv').config()

const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
  try {
    const blogs = await sequelize.query('SELECT * FROM blogs', {
      type: QueryTypes.SELECT,
    })
    printBlogs(blogs)
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

const printBlogs = (blogs) => {
  const text = blogs
    .map((x) => `${x.author}: '${x.title}', ${x.likes} likes`)
    .join('\n')
  console.log(text)
}

main()
