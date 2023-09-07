/* This is where the server app starts */

// Module requirements
const express = require('express')
const cors = require("cors");
const dotenv = require('dotenv');
const https = require("https")
const path = require("path")
const fs = require("fs")
const fileUpload = require('express-fileupload');

const app = express()

// Configuring the key and certificate for SSL/TLS protocol usage
const httpsServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 
            "configurations", "key.pem")),
        cert: fs.readFileSync(path.join(__dirname,
            "configurations", "cert.pem")),
    },
    app
)

// Set up Global configuration access
dotenv.config({ path: './configurations/Config.env' });

const port = process.env.PORT
const host = process.env.HOST

// Define the allowed origins
const allowedOrigins = [
    'https://localhost:3000'
];

// Configure CORS with allowed origins
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    },
};

/* Middleware used to read body requests */
app.use(cors(corsOptions))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Use express-fileupload middleware
app.use(
    fileUpload({
        useTempFiles: true,
        safeFileNames: true,
        preserveExtension: true,
        tempFileDir: `${__dirname}/public/`
    })
);

app.post('/upload', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No files were uploaded.' });
    }

    // The name of the input field (i.e., "image") should match the name on the client side
    const uploadedImage = req.files.image;

    // Generate a unique filename using MD5 hash and original filename
    const originalFilename = uploadedImage.name;
    const md5Hash = require('crypto').createHash('md5').update(originalFilename).digest('hex');
    const uniqueFilename = `${md5Hash}_${originalFilename}`;

    // Move the uploaded file to the desired location
    uploadedImage.mv(`${__dirname}/public/${uniqueFilename}`, function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error uploading file.' });
        }

        // Return a response indicating success
        return res.status(200).json({ status: 'uploaded', filename: uniqueFilename });
    });
});


// User Routes
const userRouter = require('./routes/userRoutes.js')
app.use('/user', userRouter)

// Listing Routes
const listingRoutes = require('./routes/listingRoutes.js')
app.use('/listing', listingRoutes)

// Review Routes
const reviewRoutes = require('./routes/reviewRoutes.js')
app.use('/review', reviewRoutes)

// Message Routes
const messageRoutes = require('./routes/messageRoutes.js')
app.use('/message', messageRoutes)

// Booking Routes
const bookingRoutes = require('./routes/bookingRoutes.js')
app.use('/booking', bookingRoutes)

// UserListing Routes
const userListingRoutes  = require('./routes/userListingRoutes.js')
app.use('/userListing', userListingRoutes);

// UserSearch Routes
const userSearchRoutes  = require('./routes/userSearchRoutes.js')
app.use('/userSearch', userSearchRoutes);

// UserListingParams Routes
const userListingParamsRoutes  = require('./routes/userListingParamsRoutes.js')
app.use('/userListingParams', userListingParamsRoutes);

// Update Key Request
const { updateKeys } = require('./configurations/updateKeys.js')
app.post('/updateKeys', updateKeys);

// Template default routes for the app
app.get('/', (req,res) => {
    res.status(200).json({message: "Home Page"})
})

app.all('*', (req,res) => {
    res.status(404).json({message: "Page not found"})
})

httpsServer.listen(port, host, () => {
    console.log(`Server listening on port ${host}:${port}...`)
})