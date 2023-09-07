module.exports = (sequelize, DataTypes) => {

    const UserSearch = sequelize.define("usersearches", {

        // userSearch table and its attributes
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true, allowNull: false},
        country: {type: DataTypes.STRING, allowNull: true},
        city: {type: DataTypes.STRING, allowNull: true},
        neighborhood: {type: DataTypes.STRING, allowNull: true},
        checkIn: {type: DataTypes.DATEONLY, allowNull: true},
        checkOut: {type: DataTypes.DATEONLY, allowNull: true},
        maxGuests: {type: DataTypes.INTEGER, allowNull: true},
    })

    return UserSearch
}


// 9. Susthma Sustasewn ===========
// AlreadyRentedHouses
// AlreadyRentedHousesReviews
// UserSearches
// UserSearchesDetailsClicked