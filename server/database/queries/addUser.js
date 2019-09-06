// Write a query to add the user and their password to the database
const dbConnection = require('../config/connection');

exports.addUser = data => {
    const { email, hash } = data;
    return dbConnection.query({
        text: 'INSERT INTO users (email , password) VALUES ($1,$2) RETURNING *; ',
        values: [email, hash],
    });
};