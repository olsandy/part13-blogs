const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const { Session } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/login', async (request, response) => {
  const { username, password } = request.body

  const user = await User.scope('withPassword').findOne({
    where: {
      username: username,
    },
  })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)
  await Session.upsert({ userId: user.id, token })

  response.status(200).send({ token, username: user.username, name: user.name })
})

router.delete('/logout', tokenExtractor, async (req, res, next) => {
  const rows = await Session.destroy({ where: { userId: req.decodedToken.id } })
  console.log('rows', rows)
  res.status(200).json({ destroyed: rows })
})

module.exports = router
