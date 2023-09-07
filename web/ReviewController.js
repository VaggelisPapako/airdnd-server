const { Sequelize } = require('sequelize');
const db = require('../model')
// const ms = require('ms');
const Review = db.reviews

// Request using POST method that adds a review to the database
const addReview = async (req, res) => {

    try {
      await Review.create({
        reviewId:  req.body.reviewId,
        listingId: req.body.listingId,
        landlordId: req.body.landlordId,
        userId: req.body.userId,
        username: req.body.username,
        date: req.body.date,
        reviewText: req.body.reviewText,
        rating: req.body.rating
      });
  
      res.status(200).json({ message: "Review created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create review" });
    }
};

// Request using GET method that retrieves the reviews with the listingId given as foreignKey from the parameters of the request
const getReviewsByListingId = async (req, res) => {
  
  const id = req.params.id;

  try {
    const reviews = await Review.findAll({
      where: { listingId: id },
    });
    res.status(200).json({message: reviews});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve reviews by listing" });
  }
  
}

// Request using GET method that retrieves the reviews with the landlordId given as foreignKey from the parameters of the request
const getReviewsByLandlordId = async (req, res) => {
  
  const id = req.params.id;
  
  try {
    const reviews = await Review.findAll({
      where: { landlordId: id },
    });
    res.status(200).json({message: reviews});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve reviews by landlord" });
  }
  
}

// Request using GET method that retrieves the reviews with the landlordId given as foreignKey from the parameters of the request
const countReviewsByLandlordId = async (req, res) => {
  const id = req.params.id

  try {

    const count = await Review.count({
      where: {
        landlordId: id
      }
    });

    res.status(200).json({message: count});

  } catch (error) {
    res.status(500).json({ message: "Failed to count reviews" });
  }
}

module.exports = {
    addReview,
    getReviewsByListingId,
    getReviewsByLandlordId,
    countReviewsByLandlordId
}