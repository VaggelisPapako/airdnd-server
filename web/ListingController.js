const { sequelize } = require('sequelize');
const db = require('../model')
// const ms = require('ms');
const Listing = db.listings

// Request using POST method that adds a listing to the database
const addListing = async (req, res) => {

    try {
      await Listing.create({
        id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        photos: req.body.photos,
        houseRules: req.body.houseRules,
        minimumLengthStay: req.body.minimumLengthStay,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        maxGuests: req.body.maxGuests,
        bedsNumber:req.body.bedsNumber,
        bathroomsNumber: req.body.bathroomsNumber,
        bedroomsNumber: req.body.bedroomsNumber,
        squareMeters: req.body.squareMeters,
        amenities: req.body.amenities,
        spaceType: req.body.spaceType,
        minPrice: req.body.minPrice,
        dailyPrice: req.body.dailyPrice,
        map: req.body.map, 
        country: req.body.country,
        city: req.body.city,
        neighborhood: req.body.neighborhood,
        transit: req.body.transit,
        reviewCount: req.body.reviewCount,
        reviewAvg: req.body.reviewAvg,
        hasLivingRoom: req.body.hasLivingRoom,
        description: req.body.description,
        isBooked: req.body.isBooked,
        userId: req.body.userId
      });

      res.status(200).json({ message: "Listing created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create listing" });
    }
  };

  const searchListings = async (req, res) => {

    const searchCriteria = {
      country: req.query.country,
      city: req.query.city,
      neighborhood: req.query.neighborhood,
      checkIn: req.query.checkInDate,
      checkOut: req.query.checkOutDate,
      numPeople: req.query.numPeople,
    };

    console.log(searchCriteria)
  
    // Create an object to hold the dynamic query conditions
    const whereConditions = {};

    // Add conditions for non-blank fields
    if (searchCriteria.country) {
      whereConditions.country = searchCriteria.country;
    }
    if (searchCriteria.city) {
      whereConditions.city = searchCriteria.city;
    }
    if (searchCriteria.neighborhood) {
      whereConditions.neighborhood = searchCriteria.neighborhood;
    }
    if (searchCriteria.checkIn) {
      whereConditions.checkIn = searchCriteria.checkIn;
    }
    if (searchCriteria.checkOut) {
      whereConditions.checkOut = searchCriteria.checkOut;
    }
    if (searchCriteria.numPeople) {
      whereConditions.maxGuests = searchCriteria.numPeople;
    }

    try {
      const searchResults = await Listing.findAll({
        where: whereConditions,
      });
  
      res.status(200).json({ results: searchResults });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Search Failed" });
    }
  };


const getPlacesByLandlordId = async(req, res) => {
  const landlordId = req.params.id

  try {
    const listings = await Listing.findAll({
      where: { userId: landlordId },
    });
    res.status(200).json({message: listings});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve listings by Landlord id" });
  }
}

const getListingById = async(req, res) => {
  const id = req.params.id

  try {
    const listing = await Listing.findOne({
      where: { id: id },
    });
    res.status(200).json({message: listing});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve listing by id" });
  }
}

module.exports = {
    addListing,
    searchListings,
    getPlacesByLandlordId,
    getListingById
}