//All required variables and functions.
const database = require('./connection');
const tables = ['employees', 'roles', 'departments']
const databaseName = 'employeeroster'
//initializes database by dropping database and recreating and using it
function initializeDatabase(databaseName) {
    sql = `DROP DATABASE IF EXISTS ${databaseName};`
    queryReturn(sql, `${databaseName} Removed`)
    sql = `CREATE DATABASE ${databaseName};`
    queryReturn(sql, `${databaseName} Created`)
    sql = `USE ${databaseName};`
    queryReturn(sql, `${databaseName} Initialized`)
}
//removes all tables if they exist
function dropExistingTables(tables) {
    let sql = ``
    for (var i = 0; i < tables.length;) {
        sql = `DROP TABLE IF EXISTS ${tables[i++]}; `
        queryReturn(sql, `Cleared Table: ${sql.split(' ')[4].split(';')[0]}`)
    }
}
//used throughout the code, a quick way to either display a table with 'output', display a user inputting message with 'message' or perform an action with 'return'
function queryReturn(sql, message) {
    database.query(sql, function (err, results) {
        if (err) throw err;
        if (message == 'output') {
            console.table(results)
        } else if (message == 'return') {
            return
        }
        else
            console.log(`${message}`)
    });
}
//create the department table, returns message
function createDepartmentTable() {
    var sql = `CREATE TABLE departments (
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        department_name VARCHAR(30) NOT NULL
    );    
    `
    queryReturn(sql, `${sql.split(' ')[2]} table created.`)
}
//create a role table, returns message
function createRoleTable() {
    var sql = `CREATE TABLE roles (
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(30) NOT NULL,
        salary DECIMAL(9,2) NOT NULL,
        department_id INTEGER NOT NULL,
        CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id)
    );
    `
    queryReturn(sql, `${sql.split(' ')[2]} table created.`)
}
//create an employee table, returns message
function createEmployeeTable() {
    var sql = `CREATE TABLE employees (
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INTEGER NOT NULL,
        manager_id INTEGER,
        CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id),
        CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id)
    );
    `
    queryReturn(sql, `${sql.split(' ')[2]} table created.`)
}
//consolidates functions.
function createAllTables() {
    createDepartmentTable();
    createRoleTable();
    createEmployeeTable();
}
module.exports = { databaseName, tables, initializeDatabase, dropExistingTables, createAllTables, queryReturn }

// database.end()