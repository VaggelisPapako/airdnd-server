const { Sequelize } = require('sequelize');
const db = require('../model')
const { Op, literal } = require('sequelize');
const Listing = db.listings
const Review = db.reviews

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
        additionalPrice: req.body.additionalPrice,
        dailyPrice: req.body.dailyPrice,
        longtitude: req.body.longtitude,
        latitude: req.body.latitude, 
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

  // Request using GET method that returns all the listings with the given search query parameters (some of them can be empty)
  const searchListings = async (req, res) => {

    const searchCriteria = {
      country: req.query.country,
      city: req.query.city,
      neighborhood: req.query.neighborhood,
      checkIn: req.query.checkInDate,
      checkOut: req.query.checkOutDate,
      numPeople: req.query.numPeople,
      spaceType: req.query.spaceType,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      amenities: req.query.amenities ? req.query.amenities.split(',') : []
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
    
    if (searchCriteria.checkIn && searchCriteria.checkOut) {
      whereConditions.checkIn = {
          [Op.lte]: searchCriteria.checkIn, // Less than or equal to
      };
      whereConditions.checkOut = {
          [Op.gte]: searchCriteria.checkOut, // Greater than or equal to
      };
    }

    if (searchCriteria.numPeople) {
      whereConditions.maxGuests = {
        [Op.gte]: searchCriteria.numPeople}; // Greater than or equal to
    }

    // Add conditions for spaceType
    if (searchCriteria.spaceType) {
      whereConditions.spaceType = searchCriteria.spaceType;
    }

    // Add conditions for price range
    if (searchCriteria.minPrice && searchCriteria.maxPrice) {
      whereConditions.dailyPrice = {
          [Op.between]: [searchCriteria.minPrice, searchCriteria.maxPrice],
      };
    }

    // Add conditions for amenities
    // Construct the amenities condition using Op.and
    if (searchCriteria.amenities) {
      whereConditions.amenities = {
          [Op.and]: searchCriteria.amenities.map(amenity => {
              return {
                  [Op.like]: `%${amenity}%`
              };
          })
      };
    }

    try {

      whereConditions.isBooked = false

      const searchResults = await Listing.findAll({
        where: whereConditions,
        order: [['dailyPrice', 'ASC']], // Sort by dailyPrice in ascending order
      });
  
      res.status(200).json({ results: searchResults });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Search Failed" });
    }
  };

// Request using GET method that returns all the listings with the given landlordId as foreignKey from the url parameters
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

// Request using GET method that returns all the listings with the given landlordId as foreignKey from the url parameters, that also have isBooked value equal to true
const getBookedPlacesByLandlordId = async(req, res) => {
  const landlordId = req.params.id

  try {
    const listings = await Listing.findAll({
      where: { userId: landlordId, isBooked:true },
    });
    res.status(200).json({message: listings});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve booked listings by Landlord id" });
  }
}

// Request using GET method that returns the listing with the given id from the url parameters
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

// Request using GET method that returns all unique values of spaceType in the table 
const getAllUniqueSpaceTypes = async (req, res) => {
  try {
    const uniqueSpaceTypes = await Listing.findAll({
      attributes: ['spaceType'],
      group: ['spaceType'],
    });

    const spaceTypes = uniqueSpaceTypes.map((item) => item.spaceType);
    res.status(200).json({message: spaceTypes});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve unique space types" });
  }
};

// Request using GET method that returns the max value of dailyPrice in the table 
const getMaxDailyPrice = async(req, res) => {
  try {
    Listing.max('dailyPrice').then(maxValue => {
      res.status(200).json({message: maxValue});
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to retrieve maximum daily price" });
  }
}

// Request using PUT method that updates all the fields of the place given its id
// ID NEVER CHANGES
const updateListing = async (req, res) => {
  try {
    const updatedData = {
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
      additionalPrice: req.body.additionalPrice,
      dailyPrice: req.body.dailyPrice,
      longtitude: req.body.longtitude,
      latitude: req.body.latitude, 
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
    };

    await Listing.update(updatedData, {
      where: { id: req.body.id },
    });

    res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update listing" });
  }
};

// Request using PUT method that sets the entry's with the listingId given from the body isBooked to true
const bookListing = async (req, res) => {
  try {
    const listingId = req.body.id
    const updatedData = {
      isBooked: true
    }

    await Listing.update(updatedData, {
      where: { id: listingId },
    });

    res.status(200).json({ message: "Successfully booked" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to book listing" });
  }
}

// Request using PUT method that increases by one the entry's with the listingId given from the body reviewCount and recalculates the reviewAvg
const addReview = async (req, res) => {
    
  try {
    const id = req.body.id;
    console.log(id)

    // Ensure the 'id' is valid and corresponds to an existing listing
    const listing = await Listing.findOne({
        where: {
            id: id
        }
    });

    // Calculate the average rating
    const result = await Review.findOne({
        attributes: [
            [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
        ],
        where: {
            listingId: id
        }
    });

    const averageRating = result.getDataValue('averageRating');
    console.log("Average Rating:", averageRating);

    if (isNaN(averageRating)) {
        // Handle the case where 'averageRating' is not a number (e.g., it's NaN)
        throw new Error("Average rating is not a number");
    }

    const updatedData = {
        // increase review count by 1
        reviewCount: listing.reviewCount + 1,
        reviewAvg: averageRating
    };

    await Listing.update(updatedData, {
        where: { id: id },
    });

    res.status(200).json({ message: "Successfully added" });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add review" });
  }
}

// Request using DELETE method that deletes the listing with the id given from the parameters of the request
const deleteListing = async (req, res) => {
  try {
    const listingId = req.params.id;

    if (!listingId) {
      return res.status(400).json({ message: "Listing ID is required in the request body" });
    }

    const deletionResult = await Listing.destroy({
      where: { id: listingId },
    });

    if (deletionResult === 0) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete listing" });
  }
};

module.exports = {
    addListing,
    searchListings,
    getPlacesByLandlordId,
    getBookedPlacesByLandlordId,
    getListingById,
    getAllUniqueSpaceTypes,
    getMaxDailyPrice,
    updateListing,
    bookListing,
    addReview,
    deleteListing,
    addReview
}