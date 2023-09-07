const reviewController = require('../web/ReviewController.js')
const router = require('express').Router()

// These are all the paths that the server app includes as far as the review table is concerned

router.post('/addReview', reviewController.addReview)
router.get('/getReviewsByListingId/:id', reviewController.getReviewsByListingId)
router.get('/getReviewsByLandlordId/:id', reviewController.getReviewsByLandlordId)
router.get('/countReviewsByLandlordId/:id', reviewController.countReviewsByLandlordId)

module.exports = router