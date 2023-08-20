const dotenv = require('dotenv');
dotenv.config()

/**
 * This includes all the configurations needed to connect the application with the database.
 * Feel free to change the username and password as desired in Config.env.
 */
module.exports= {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db: process.env.DB_NAME,
    dialect: "mysql", // We are using MySQL database
    pool: {max: 5, min: 0, acquire: 30000, idle: 10000}
}
