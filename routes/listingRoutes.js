const listingController = require('../web/ListingController.js')
const router = require('express').Router()

// These are all the paths that the server app includes as far as the listing table is concerned

router.post('/addListing', listingController.addListing)
router.get('/searchListings', listingController.searchListings)
router.get('/getPlacesByLandlordId/:id', listingController.getPlacesByLandlordId) // get all owned places
router.get('/getBookedPlacesByLandlordId/:id', listingController.getBookedPlacesByLandlordId) // get all booked places
router.get('/getListingById/:id', listingController.getListingById)
router.get('/getAllUniqueSpaceTypes', listingController.getAllUniqueSpaceTypes)
router.get('/getMaxDailyPrice', listingController.getMaxDailyPrice)
router.put('/updateListing', listingController.updateListing)
router.put('/bookListing', listingController.bookListing)
router.put('/addReview', listingController.addReview)
router.delete('/deleteListing/:id', listingController.deleteListing)

module.exports = router