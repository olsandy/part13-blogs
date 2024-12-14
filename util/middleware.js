const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { Session } = require('../models')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log(JSON.stringify(error, null, 2))
  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).send({ error: 'unknown database error' })
  } else if (
    ['SequelizeValidationError', 'SequelizeUniqueConstraintError'].includes(
      error.name
    )
  ) {
    return response
      .status(400)
      .send({ error: error.errors.map((x) => x.message).join('. ') })
  } else if (error.name === 'SequelizeForeignKeyConstraintError') {
    return response
      .status(400)
      .send({ error: 'A foreign key value is not present in original table.' })
  }

  next(error)
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const token = authorization.substring(7)
      const decodedToken = jwt.verify(token, SECRET)
      if (
        !(await Session.findOne({ where: { userId: decodedToken.id, token } }))
      ) {
        return res.status(401).json({ error: 'session expired' })
      }
      req.decodedToken = decodedToken
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
}
