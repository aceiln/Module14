const Sequelize = require('sequelize');
require('dotenv').config();

let SequelizeObj;
if (process.env.JAWSDB_URL){
    SequelizeObj = new Sequelize(process.env.JAWSDB_URL);
} else {
    SequelizeObj = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3006,
        }
    );
}

module.exports = SequelizeObj;