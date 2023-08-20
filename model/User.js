module.exports = (sequelize, DataTypes) => {

    // User table and its attributes
    const User = sequelize.define("user", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true, allowNull: false},
        username: {type: DataTypes.STRING, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        firstname: {type: DataTypes.STRING, allowNull: false},
        lastname: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false},
        phoneNumber: {type: DataTypes.STRING, allowNull: false},
        image: {type: DataTypes.STRING},
        // Roles
        isAdmin: {type: DataTypes.BOOLEAN, allowNull: false},
        isLandlord: {type: DataTypes.BOOLEAN, allowNull: false},
        isTenant: {type: DataTypes.BOOLEAN, allowNull: false},
        isApproved: {type: DataTypes.BOOLEAN, allowNull: false}
    })

    return User
}