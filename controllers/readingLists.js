const router = require('express').Router()

const { ReadingList, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res, next) => {
  const { blogId, userId } = req.body
  const listing = await ReadingList.create({ blogId, userId })
  res.json(listing)
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  const listing = await ReadingList.findOne({
    where: {
      id: req.params.id,
      userId: user.id,
    },
  })

  if (listing) {
    listing.state = req.body.read === true ? 'read' : listing.state
    await listing.save()
    res.json(listing)
  } else {
    res.status(404).end()
  }
})

module.exports = router
