const reviewController = require('../web/ReviewController.js')
const router = require('express').Router()

router.post('/addReview', reviewController.addReview)

module.exports = router