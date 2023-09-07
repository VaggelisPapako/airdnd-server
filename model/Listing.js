module.exports = (sequelize, DataTypes) => {

    const Listing = sequelize.define("listing", {

        // Listing Table and its attributes
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true, allowNull: false},
        name: {type: DataTypes.STRING, allowNull: false},
        address: {type: DataTypes.STRING, allowNull: false},

        // List of photo URLs
        photos: {
            type: DataTypes.TEXT, // Use TEXT for storing JSON data
            allowNull: true,
            get() {
                const value = this.getDataValue('photos');
                return value ? JSON.parse(value) : [];
            },
            set(value) {
                this.setDataValue('photos', JSON.stringify(value));
            }
        },

        // List of Rules of the House
        houseRules: {
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                const value = this.getDataValue('houseRules');
                return value ? JSON.parse(value) : [];
            },
            set(value) {
                this.setDataValue('houseRules', JSON.stringify(value));
            }
        },

        minimumLengthStay: {type: DataTypes.INTEGER, allowNull: false},
        checkIn: {type: DataTypes.DATEONLY, allowNull: false},
        checkOut: {type: DataTypes.DATEONLY, allowNull: false},
        maxGuests: {type: DataTypes.INTEGER, allowNull: false},
        bedsNumber: {type: DataTypes.INTEGER, allowNull: false},
        bathroomsNumber: {type: DataTypes.FLOAT, allowNull: false},
        bedroomsNumber: {type: DataTypes.INTEGER, allowNull: false},
        squareMeters: {type: DataTypes.FLOAT, allowNull: false},

        // List of amenities provided by the place
        amenities: {
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                const value = this.getDataValue('amenities');
                return value ? JSON.parse(value) : [];
            },
            set(value) {
                this.setDataValue('amenities', JSON.stringify(value));
            }
        },
        
        spaceType: {type: DataTypes.STRING, allowNull: false},
        additionalPrice: {type: DataTypes.INTEGER, allowNull: false},
        dailyPrice: {type: DataTypes.INTEGER, allowNull: false},
        latitude: {type: DataTypes.FLOAT, allowNull: false},
        longtitude: {type: DataTypes.FLOAT, allowNull: false},
        country: {type: DataTypes.STRING, allowNull: false},
        city: {type: DataTypes.STRING, allowNull: false},
        neighborhood: {type: DataTypes.STRING, allowNull: false},
        
        // List of means of transportation near the place
        transit: {
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                const value = this.getDataValue('transit');
                return value ? JSON.parse(value) : [];
            },
            set(value) {
                this.setDataValue('transit', JSON.stringify(value));
            }
        },

        reviewCount: {type: DataTypes.INTEGER, allowNull: false},
        reviewAvg: {type: DataTypes.FLOAT, allowNull: false},
        hasLivingRoom: {type: DataTypes.BOOLEAN, allowNull: false},
        description: {type: DataTypes.TEXT, allowNull: true},
        isBooked: {type: DataTypes.BOOLEAN, allowNull: true},
    })

    return Listing
}


// 9. Susthma Sustasewn ===========
// AlreadyRentedHouses
// AlreadyRentedHousesReviews
// UserSearches
// UserSearchesDetailsClicked


// Bookings
// 