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

db.reviews = require('./Review.js')(sequelize, DataTypes)

// Allowing One to Many Association between users and listings
db.users.hasMany(db.listings, { as: "listings" });
db.listings.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
}); 

// Allowing One to Many Association between users and reviews
db.users.hasMany(db.reviews, { as: "reviews" });
db.reviews.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

// Allowing One to Many Association between users and listings
db.listings.hasMany(db.reviews, { as: "reviews" });
db.reviews.belongsTo(db.listings, {
  foreignKey: "listingId",
  as: "listing",
}); 

/* Command that allows us to re-sync the database with the server whenever a change
 * is made to the code or the database 
 */ 
db.sequelize.sync({force: false}).then(() => {
    console.log("Re-sync done")
})

module.exports = db