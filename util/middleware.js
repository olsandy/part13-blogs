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

module.exports = {
  errorHandler,
  unknownEndpoint,
}
