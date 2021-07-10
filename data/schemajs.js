const database = require('./connection');
const tables = ['employees', 'roles', 'departments']
const databaseName = 'employeeroster'

function initializeDatabase(databaseName) {
    sql = `DROP DATABASE IF EXISTS ${databaseName};`
    queryReturn(sql, `${databaseName} Removed`)
    sql = `CREATE DATABASE ${databaseName};`
    queryReturn(sql, `${databaseName} Created`)
    sql = `USE ${databaseName};`
    queryReturn(sql, `${databaseName} Initialized`)
}

function dropExistingTables(tables) {
    let sql = ``
    for (var i = 0; i < tables.length;) {
        sql = `DROP TABLE IF EXISTS ${tables[i++]}; `
        queryReturn(sql, `Cleared Table: ${sql.split(' ')[4].split(';')[0]}`)
    }
}

function queryReturn(sql, message) {
    database.query(sql, function (err, results) {
        if (err) throw err;
        if (message == 'output') {
            console.table(results)
        } else
            console.log(`${message}`)
    });
}

function createDepartmentTable() {
    var sql = `CREATE TABLE departments (
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        department_name VARCHAR(30) NOT NULL
    );    
    `
    queryReturn(sql, `${sql.split(' ')[2]} table created.`)
}

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

function createAllTables() {
    createDepartmentTable();
    createRoleTable();
    createEmployeeTable();
}
module.exports = { databaseName, tables, initializeDatabase, dropExistingTables, createAllTables, queryReturn }

// database.end()