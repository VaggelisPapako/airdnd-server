const { sequelize } = require('sequelize');
const db = require('../model')
// const ms = require('ms');
const Review = db.reviews

// Request using POST method that adds a review to the database
const addReview = async (req, res) => {
    console.log(req.body);
    try {
      await Review.create({
        reviewId:  req.body.reviewId,
        listingId: req.body.listingId,
        userId: req.body.userId,
        username: req.body.username,
        date: req.body.date,
        reviewText: req.body.reviewText
      });
  
      res.status(200).json({ message: "Review created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create review" });
    }
};

module.exports = {
    addReview
}