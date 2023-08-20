const { sequelize } = require('sequelize');
const db = require('../model')
const jwt = require('jsonwebtoken');
// const ms = require('ms');
const User = db.users

// Request using POST method that adds a user to the database
const addUser = async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      image: req.body.image,
      isAdmin: req.body.isAdmin,
      isLandlord: req.body.isLandlord,
      isTenant: req.body.isTenant,
      isApproved: req.body.isApproved
    });

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

const generateToken = async (req, res) => {
  // Validate User Here
  // Then generate JWT Token

  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  const expiresIn = '1h'; // Token will expire in 1 hour

  let data = {
    time: Date(),
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    isLandlord: req.body.isLandlord,
    isTenant: req.body.isTenant
  }

  const token = jwt.sign(data, jwtSecretKey, { expiresIn });

  res.status(200).json({token: token});
}
  
// Request using GET method that retrieves all user information from the database
const getAllUsers = async (req,res) => {
  let users = await User.findAll()
  res.status(200).json({message: users})
}

// Request using GET method that retrieves all users that share the same username as given from the parameters of the request
const isUsernameTaken = async (req, res) => {
  const username = req.params.username;

  try {

    const users = await User.findAll({
      where: { username: username },
    });

    const message = users.length > 0 ? "Username already taken" : ""
    res.status(200).json({message: message});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve users by username" });
  }
};

// Request using GET method that retrieves the user with the id given from the parameters of the request
const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({
      where: { id: id },
    });
    res.status(200).json({message: user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve user by id" });
  }
};

// Request using GET method that retrieves the user with the id given from the parameters of the request
const getUserByUsername = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({
      where: { username: username },
    });
    res.status(200).json({message: user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve user by username" });
  }
};

const validateToken = async (req, res) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);
    const tokenWithoutBearer = token.replace("Bearer ", "");
    const verified = jwt.verify(tokenWithoutBearer, jwtSecretKey);

    if (verified) {
      return res.status(200).json({ message: "Token successfully verified" });
    } else {
      return res.status(401).json({ error: "Access denied: Invalid token" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Access denied: Invalid token" });
  }
};

const decodeToken = async (req, res) => {

  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;

  try {

    const token = req.header(tokenHeaderKey);
    const tokenWithoutBearer = token.replace("Bearer ", "");
    const decodedToken = jwt.decode(tokenWithoutBearer);

    if (decodedToken) {

      return res.status(200).json(
        {
          time: decodedToken.time,
          id: decodedToken.id,
          username: decodedToken.username,
          password: decodedToken.password,
          isAdmin: decodedToken.isAdmin,
          isLandlord: decodedToken.isLandlord,
          isTenant: decodedToken.isTenant 
        }
      )

    } else {
      return res.status(401).send(error)
    }
    
  } catch (error) {
    
    // Access Denied
    return res.status(401).send(error);

  }
}

// Request using PUT method that updates the isApproved field of the user given his id
const approveUser = async (req, res) => {
  try {
    await User.update(
      {isApproved: req.body.isApproved},
      {where: {id: req.body.id}}
    )
    res.status(200).json({message: "Successfully updated"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to approve user" });
  }
}

// Request using PUT method that updates all the fields of the user given his id
// ID NEVER CHANGES
const updateUser = async (req, res) => {
  try {
    const updatedData = {
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      image: req.body.image,
      isAdmin: req.body.isAdmin,
      isLandlord: req.body.isLandlord,
      isTenant: req.body.isTenant,
      isApproved: req.body.isApproved,
    };

    await User.update(updatedData, {
      where: { id: req.body.id },
    });

    res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};


module.exports = {
    addUser,
    generateToken,
    getAllUsers,
    isUsernameTaken,
    getUserById,
    getUserByUsername,
    validateToken,
    decodeToken,
    approveUser,
    updateUser
}