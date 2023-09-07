const bookingController = require('../web/BookingController.js')
const router = require('express').Router()

// These are all the paths that the server app includes as far as the booking table is concerned

router.post('/addBooking', bookingController.addBooking)
router.get('/getBookingsByUserId/:id', bookingController.getBookingsByUserId)

module.exports = router