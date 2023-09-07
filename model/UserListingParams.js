module.exports = (sequelize, DataTypes) => {

    // A make-believe dataframe that accumulates all the parameters that shape the matrix value for each user-listing cell
    const UserListingParams = sequelize.define("userlistingparams", {

        // userListingParams table and its attributes
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true, allowNull: false},
        timesHasBooked: {type: DataTypes.INTEGER, allowNull: false},
        rating: {type: DataTypes.INTEGER, allowNull: false},
        visitCount: {type: DataTypes.INTEGER, allowNull: false},  // how many times the user has visited/clicked-on this listing
        timesHasSearchedCountry: {type: DataTypes.INTEGER, allowNull: false},
        timesHasSearchedCity: {type: DataTypes.INTEGER, allowNull: false},
        timesHasSearchedNeighborhood: {type: DataTypes.INTEGER, allowNull: false},
        timeshasSearchedMaxGuests: {type: DataTypes.INTEGER, allowNull: false}
    })

    return UserListingParams
}