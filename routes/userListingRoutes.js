const userListingController = require('../web/UserListingController.js')
const router = require('express').Router()

// These are all the paths that the server app includes as far as the userListing table is concerned

router.post('/addUserListing', userListingController.addUserListing)
router.get('/getUserListing/:userId/:listingId', userListingController.getUserListing)
router.put('/incrementUserListing', userListingController.incrementUserListing)

module.exports = router