module.exports = (sequelize, DataTypes) => {

    const Review = sequelize.define("review", {
        reviewId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true, allowNull: false},
        // listingId: {type: DataTypes.INTEGER, allowNull: false},
        // userId: {type: DataTypes.INTEGER, allowNull: false},
        username: {type: DataTypes.STRING, allowNull: false},
        date: {type: DataTypes.DATEONLY, allowNull: false},
        reviewText: {type: DataTypes.TEXT, allowNull: true},
    })

    return Review
}