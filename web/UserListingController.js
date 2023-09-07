const { Sequelize } = require('sequelize');
const db = require('../model')
const { Op, literal } = require('sequelize');
const UserListing = db.userlistings
// const Review = db.reviews

// Request using POST method that adds a user visiting a listing to the database
const addUserListing = async (req, res) => {

  try {
    await UserListing.create({
      userId: req.body.userId,
      listingId: req.body.listingId,
      visitCount: 1
    });

    res.status(200).json({ message: "UserListing created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create UserListing" });
  }
};

// Request using GET method that retrieves the userListings with the userId and listingId given as foreignKeys from the parameters of the request
const getUserListing = async(req, res) => {

  const userId = req.params.userId;
  const listingId = req.params.listingId;

  try {
    const userListing = await UserListing.findOne({
      where: { userId: userId, listingId: listingId },
    });
    res.status(200).json({message: userListing});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve userListing" });
  }
}

// Request using PUT method that increases by one the entry's with the userId and listingId given as foreignKeys from the parameters of the request visitcount 
const incrementUserListing = async(req, res) => {
  const userId = req.body.userId;
  const listingId = req.body.listingId;

  try {
    const userListing = await UserListing.findOne({
      where: { userId: userId, listingId: listingId },
    });

    if (!userListing) {
      return res.status(404).json({ message: 'UserListing not found' });
    }

    // Increment the user's age by one
    userListing.visitCount += 1;

    // Save the updated user
    await userListing.save();

    res.status(200).json({message: "UserListing updated successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to increment userListing" });
  }
}

module.exports = {
    addUserListing,
    getUserListing,
    incrementUserListing
}