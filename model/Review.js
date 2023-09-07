module.exports = (sequelize, DataTypes) => {

    // Review table and its attributes
    const Review = sequelize.define("review", {
        reviewId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true, allowNull: false},
        username: {type: DataTypes.STRING, allowNull: false},
        date: {type: DataTypes.DATEONLY, allowNull: false},
        reviewText: {type: DataTypes.TEXT, allowNull: false},
        rating: {type: DataTypes.FLOAT, allowNull: false}
    })

    return Review
}