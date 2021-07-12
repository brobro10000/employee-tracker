
const mysql = require('mysql2')
//establishes connectiong with SQL database, password 'root' may be changed to users sql database password
const database = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'root',
    database: 'employeeroster'
});


//dotenv package
module.exports = database;