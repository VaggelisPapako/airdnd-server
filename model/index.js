const databaseConfig = require('../configurations/DataBaseConfig.js')
const {Sequelize, DataTypes} = require('sequelize')

/**
 * We initialize the database using Sequelize
 */
const sequelize = new Sequelize(
    databaseConfig.db,
    databaseConfig.user,
    databaseConfig.password,
    {
        host: databaseConfig.host,
        dialect: databaseConfig.dialect,
        pool: {
            max: databaseConfig.max,
            min: databaseConfig.min,
            acquire: databaseConfig.acquire,
            idle: databaseConfig.idle
        }
    }
)

// Authenticating the database
sequelize.authenticate().then(() => {
    console.log("Connected")
}).catch(error => {
    console.log("Error: ", error)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// Adding a users table inside the database
db.users = require('./User.js')(sequelize, DataTypes)

// Adding a listings table inside the database
db.listings = require('./Listing.js')(sequelize, DataTypes)

// Adding a reviews table inside the database
db.reviews = require('./Review.js')(sequelize, DataTypes)

// Adding a messages table inside the database
db.messages = require('./Message.js')(sequelize, DataTypes)

// Adding a bookings table inside the database
db.bookings = require('./Booking.js')(sequelize, DataTypes)

// Adding a userSearch table inside the database
db.usersearches = require('./UserSearch.js')(sequelize, DataTypes)

// Adding a userListing table inside the database
db.userlistings = require('./UserListing.js')(sequelize, DataTypes)

// Adding a userListing table inside the database
db.userlistingsparams = require('./UserListingParams.js')(sequelize, DataTypes)

// Allowing One to Many Association between users and listings
db.users.hasMany(db.listings, { as: "listings" });
db.listings.belongsTo(db.users, {
  foreignKey: "userId", // User is the owner (User is a Landlord)
  as: "User",
}); 

// Allowing One to Many Association between users and reviews
db.users.hasMany(db.reviews, { as: "reviews" });
db.reviews.belongsTo(db.users, {
  foreignKey: "userId",
  as: "User", // User is the reviewer (User is a Tenant)
  allowNull: false
});
db.reviews.belongsTo(db.users, {
  foreignKey: "landlordId",
  as: "Landlord"
});

// Allowing One to Many Association between listings and reviews
db.listings.hasMany(db.reviews, { as: "reviews" });
db.reviews.belongsTo(db.listings, {
  foreignKey: "listingId",
  as: "Listing",
}); 

// Allowing two One to Many Associations between users and messages
db.users.hasMany(db.messages, { as: "messages" });
db.messages.belongsTo(db.users, {
  foreignKey: "userId",
  as: "User", // User is the sender
  allowNull: false 
});
db.messages.belongsTo(db.users, {
  foreignKey: "receiverId",
  as: "Receiver",
  allowNull: false 
});

// Allowing One to Many Association between users and bookings
db.users.hasMany(db.bookings, { as: "bookings" });
db.bookings.belongsTo(db.users, {
  foreignKey: "userId",
  as: "User",
  allowNull: false
})

// Allowing One to Many Association between listings and bookings
db.listings.hasMany(db.bookings, { as: "bookings" });
db.bookings.belongsTo(db.listings, {
  foreignKey: "listingId",
  as: "Listing",
  allowNull: false
})

// Allowing One to Many Association between users and usersearches
db.users.hasMany(db.usersearches, {as: "usersearches"});
db.usersearches.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
  allowNull: false
})

// Allowing One to Many Association between users and userlistings
db.users.hasMany(db.userlistings, {as: "userlistings"});
db.userlistings.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
  allowNull: false
})

// Allowing One to Many Association between listing and userlistings
db.listings.hasMany(db.userlistings, {as: "userlistings"});
db.userlistings.belongsTo(db.listings, {
  foreignKey: "listingId",
  as: "listing",
  allowNull: false
})

// Allowing One to Many Association between users and userlistingsparams
db.users.hasMany(db.userlistingsparams, {as: "userlistingsparams"});
db.userlistingsparams.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
  allowNull: false
})

// Allowing One to Many Association between listings and userlistingsparams
db.listings.hasMany(db.userlistingsparams, {as: "userlistingsparams"});
db.userlistingsparams.belongsTo(db.listings, {
  foreignKey: "listingId",
  as: "listing",
  allowNull: false
})


/* Command that allows us to re-sync the database with the server whenever a change
 * is made to the code or the database 
 */ 
db.sequelize.sync({force: false}).then(() => {
    console.log("Re-sync done")
})

module.exports = db