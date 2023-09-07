const { Sequelize } = require('sequelize');
const db = require('../model')
const { Op, literal } = require('sequelize');
const UserSearch = db.usersearches

// Request using POST method that adds a search to the database
const addUserSearch = async (req, res) => {
    try {
        await UserSearch.create({
            userId: req.body.userId,
            country: req.body.country,
            city: req.body.city,
            neighborhood: req.body.neighborhood,
            checkIn: req.body.checkInDate,
            checkOut: req.body.checkOutDate,
            maxGuests: req.body.numPeople === '' ? 0 : req.body.numPeople,
        });

        res.status(200).json({ message: "UserSearch created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create UserSearch" });
    }
}

module.exports = {
    addUserSearch,
}