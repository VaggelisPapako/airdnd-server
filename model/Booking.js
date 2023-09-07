module.exports = (sequelize, DataTypes) => {

    // Booking Table and its attributes
    const Booking = sequelize.define("booking", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true, allowNull: false},
        date: {type: DataTypes.DATEONLY, allowNull: false},
        checkIn: {type: DataTypes.DATEONLY, allowNull: false},
        checkOut: {type: DataTypes.DATEONLY, allowNull:false},
        numGuests: {type: DataTypes.INTEGER, allowNull:false},
        price: {type: DataTypes.INTEGER, allowNull:false} 
    })

    return Booking
}