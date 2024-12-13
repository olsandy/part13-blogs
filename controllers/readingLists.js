const router = require('express').Router()

const { ReadingList } = require('../models')

router.post('/', async (req, res, next) => {
  const { blogId, userId } = req.body
  const listing = await ReadingList.create({ blogId, userId })
  res.json(listing)
})

module.exports = router
