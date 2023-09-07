const { Sequelize } = require('sequelize');
const db = require('../model')
const { Op, literal } = require('sequelize');
const User = db.users
const Listing = db.listings
const Review = db.reviews
const Booking = db.bookings
const UserListing = db.userlistings
const UserSearch = db.usersearches
const UserListingParams = db.userlistingsparams

// Request using POST method that adds a search to the database (called at will)
const createMatrixValues = async (req, res) => {
    try {
  
      const users = await User.findAll()
  
      const listings = await Listing.findAll()

      for (var user of users) {
        for (var listing of listings) {

            // Finding the average of all current user reviews for the current listing
            let result = await Review.findOne({
                attributes: [
                    [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
                ],
                where: {
                    userId: user.id,
                    listingId: listing.id
                }
            })

            let averageRating = result.getDataValue('averageRating');

            if (averageRating === null) {
                averageRating = 0
            }
            
            let userListings = await UserListing.findAll({
                where: {
                    userId: user.id,
                    listingId: listing.id
                }
            })
            
            let visitCount = 0

            // Finding the times the user has visited the listing info
            if (userListings !== []) {
                for (var userListing in userListings) {
                    visitCount += userListing.visitCount
                }
            }
        
            // Finding the times the user has booked the listing
            const timesHasBooked = await Booking.count({
                where: {
                    userId: user.id,
                    listingId: listing.id
                }
            })

            // Finding the times the user has searched the listing's country
            const timesHasSearchedCountry = await UserSearch.count({
                where: {
                    userId: user.id,
                    country: listing.country
                }
            })

            // Finding the times the user has searched the listing's city
            const timesHasSearchedCity = await UserSearch.count({
                where: {
                    userId: user.id,
                    city: listing.city
                }
            })

            // Finding the times the user has searched the listing's neighborhood
            const timesHasSearchedNeighborhood = await UserSearch.count({
                where: {
                    userId: user.id,
                    neighborhood: listing.neighborhood
                }
            })

            // Finding the times the user has searched the listing's amount of MaxGuests
            const timesHasSearchedMaxGuests = await UserSearch.count({
                where: {
                    userId: user.id,
                    maxGuests: listing.maxGuests
                }
            })

            await UserListingParams.create({
                userId: user.id,
                listingId: listing.id,
                timesHasBooked: timesHasBooked,
                rating: averageRating,
                visitCount: visitCount,
                timesHasSearchedCountry: timesHasSearchedCountry,
                timesHasSearchedCity: timesHasSearchedCity,
                timesHasSearchedNeighborhood: timesHasSearchedNeighborhood,
                timeshasSearchedMaxGuests: timesHasSearchedMaxGuests
            })
        }
      }
  
      res.status(200).json({message: "Successful create"})
      
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'An error occurred while generating recommendations.'});
    }
}

// Request using DELETE that deleted all entries from the table (called at will)
const deleteMatrixValues = async(req, res) => {
    
    UserListingParams.destroy({
        where: {}, // This empty where clause deletes all rows
    })
    .then(() => {
        res.status(200).json({message: "All entries deleted successfully"})
    })
    .catch((error) => {
        res.status(500).json({message: 'Error deleting entries:' + error});
    });
}

module.exports = {
    createMatrixValues,
    deleteMatrixValues
}