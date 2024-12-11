const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log(Object.keys(error))
  console.log(error.name)
  console.log(JSON.stringify(error, null, 2))
  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).send({ error: 'unknown database error' })
  } else if (error.name === 'SequelizeValidationError') {
    return response
      .status(400)
      .send({ error: error.errors.map((x) => x.message).join('. ') })
  }

  next(error)
}

module.exports = {
  errorHandler,
  unknownEndpoint,
}
