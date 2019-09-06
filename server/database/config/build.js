const { join } = require('path');
const { readFileSync } = require('fs');

const dbconnection = require('./connection');

const sql = readFileSync(join(__dirname, 'build.sql')).toString();

dbconnection.query(sql)
    .then(() => console.log('Successful Building for sql'))
    .catch(error => console.log(error.stack));