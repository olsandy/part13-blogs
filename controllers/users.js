const router = require('express').Router()
const bcrypt = require('bcrypt')
const { sequelize } = require('../util/db')

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  const { username, name, password } = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await User.create({ username, name, passwordHash })
  res.json(user)
})

router.get('/:id', async (req, res, next) => {
  let where = {}

  const read = req.query.read
  if (read === 'true') {
    where = {
      state: 'read',
    }
  } else if (read === 'false') {
    where = {
      state: 'unread',
    }
  }

  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId'] },
        through: {
          attributes: ['state', 'id'],
          where,
        },
      },
    ],
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', async (req, res, next) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    user.username = req.body.username
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
