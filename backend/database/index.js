const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize("soturasc", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});
const User = require('../models/user')(sequelize, DataTypes);
const Product = require('../models/products')(sequelize, DataTypes);
const db = {};
db.sequelize = sequelize;
db.User = User;
db.Product = Product;
sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

// sequelize.sync({ force: true })  
//     .then(() => {
//         console.log('Database & tables created!');
//     })
//     .catch((err) => {
//         console.error('Error creating database and tables:', err);
//     });

module.exports = db;
