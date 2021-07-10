const initSQL = require('./private/export');

const database = initSQL()
//dotenv package
module.exports = database;