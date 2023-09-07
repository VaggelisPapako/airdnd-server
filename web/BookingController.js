const { Sequelize } = require('sequelize');
const db = require('../model')
const { Op } = require("sequelize");
const Booking = db.bookings

// Request using POST method that adds a booking to the database
const addBooking = async (req, res) => {
    try {
        await Booking.create({
            date: req.body.date,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            numGuests: req.body.numPeople,
            price: req.body.price,
            userId: req.body.userId,
            listingId: req.body.placeId
        });
    
        res.status(200).json({ message: "Booking created successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create booking" });
      }
}

// Request using GET method that returns all bookings with the given userId as foreignKey from the url parameters
const getBookingsByUserId = async(req, res) => {
  try {
    const id = req.params.id
    
    const bookings = await Booking.findAll({
      where: {
        userId: id
      }
    }) 

    res.status(200).json({ message: bookings})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get bookings by userId" });
  }
}

module.exports = {
    addBooking,
    getBookingsByUserId
}