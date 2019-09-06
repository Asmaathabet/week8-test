const { Pool } = require('pg');
require('env2')('./config.env');

let dbUrl = '';
switch (process.env.NODE_ENV) {
    case 'heroku':
        dbUrl = process.env.DATABASE_URL;
        break;
    case 'dev':
        dbUrl = process.env.DEV_URL;
        break;
    default:
        throw new Error('No Database URL!!!');
}

const options = {
    connectionString: dbUrl,
    ssl: true,
};

module.exports = new Pool(options);