const database = require('./connection')
const { queryReturn } = require('./schemajs')
const Department = require('../lib/Department')
const Role = require('../lib/Role')
const Employee = require('../lib/Employee')
const department_name = ['"R&D"', '"Retail"', '"Executive"']
const title = ['"Lead Researcher"', '"Associate Researcher"', '"University Student"', '"Store Manager"',
    '"Cashier"', '"Stock Person"', '"CEO"', '"Secretary"', '"Mail Person"']
const salary = [155500, 85999, 20000, 75000, 30000, 20000, 250000, 50000, 25000]
const department_id = [1, 2, 3]
const first_name = ['"Gayle"', '"Porcius"', '"Gul"', '"Rameses"', '"Tybalt"', '"Sante"', '"Magni"', '"Gislenus"', '"Albena"', '"Stiina"', '"Nadeem"', '"Patricia"', '"Lina"', '"Valter"', '"Broos"', '"Murali"', '"Vahit"', '"Prakash"']
const last_name = ['"Aarens"', '"Arias"', '"Oliver"', '"Cecil"', '"Ferrero"', '"Beringer"', '"Radclyffe"', '"McCrae"', '"Kahler"', '"Piatek"', '"Fierro"', '"Pretorius"', '"Tolkien"', '"Vidovic"', '"Tobias"', '"Janowski"', '"Stasiuk"', '"Maric"']
const role_id = [1, 2, 2, 3, 3, 3, 4, 5, 5, 6, 6, 6, 7, 8, 8, 9, 9, 9]
const manager_id = ['NULL', 1, 1, 3, 4, 4, 'NULL', 7, 7, 8, 10, 10, 'NULL', 13, 13, 15, 15, 15]
var departmentArray = []
var roleArray = []
var employeeArray = []
const cTable = require('console.table');

function clearArr() {
    departmentArray = [];
    roleArray = [];
    employeeArray = [];
}
function populateDepartment(department_name) {
    sql = `INSERT INTO departments (department_name)
    VALUES `
    denoteEnding = ','
    for (var i = 0; i < department_name.length;) {
        while (i != department_name.length - 1)
            sql += `(${department_name[i++]})${denoteEnding} `
        denoteEnding = ';'
        sql += `(${department_name[i++]})${denoteEnding}`
    }
    queryReturn(sql, "Department Data Populated")
    sql = `SELECT * FROM departments`
    populateDepartmentArray(sql)
}

function populateDepartmentArray(sql) {
    database.query(sql, function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            let department = new Department(results[i].id, results[i].department_name)
            pushData(departmentArray, department)
        }
    });
}

function populateRole(title, salary, department_id) {
    var j = 0;
    sql = `INSERT INTO roles (title,salary,department_id)
    VALUES `
    denoteEnding = ','
    for (var i = 0; i < title.length; i++) {
        if (i == 3 || i == 6)
            j++
        if (i == title.length - 1) {
            denoteEnding = ';'
            sql += `(${title[i]},${salary[i]},${department_id[j]})${denoteEnding}`
        } else
            sql += `(${title[i]},${salary[i]},${department_id[j]})${denoteEnding} `

    }
    queryReturn(sql, "Role Data Populated")
    sql = `SELECT * FROM roles`
    populateRoleArray(sql)
}

function populateRoleArray(sql) {
    database.query(sql, function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            retrieveDepartmentById(results[i].department_id, results[i], i, results.length - 1)
        }
    });
}

function retrieveDepartmentById(id, passedResults, i, length) {
    sql = `SELECT * FROM departments WHERE id = ${id}`
    database.query(sql, function (err, results) {
        if (err) throw err;
        let role = new Role(passedResults.id, results[0].department_name, passedResults.title, passedResults.salary, passedResults.department_id)
        pushData(roleArray, role)
    })
}

function populateEmployee(first_name, last_name, role_id, manager_id) {
    sql = `INSERT INTO employees (first_name,last_name,role_id,manager_id)
    VALUES `
    denoteEnding = ','
    for (var i = 0; i < first_name.length; i++) {
        if (i == first_name.length - 1) {
            denoteEnding = ';'
            sql += `(${first_name[i]},${last_name[i]},${role_id[i]},${manager_id[i]})${denoteEnding}`
        } else
            sql += `(${first_name[i]},${last_name[i]},${role_id[i]},${manager_id[i]})${denoteEnding}`
    }
    queryReturn(sql, "Employee Data Populated")
    sql = `SELECT * FROM employees`
    populateEmployeeArray(sql)
}

function populateEmployeeArray(sql) {
    database.query(sql, function (err, results) {
        if (err) throw err;
        retrieveRoleById(results)
    });
}

function retrieveRoleById(passedResults) {
    sql = `SELECT department_name, title, salary, department_id, roles.id FROM departments RIGHT JOIN roles ON departments.id = roles.department_id`
    database.query(sql, function (err, results) {
        if (err) throw err;
        for (var i = 0; i < passedResults.length; i++) {
            for (var j = 0; j < results.length; j++) {
                if (passedResults[i].role_id == results[j].id) {
                    var title = results[j].title
                    var name = results[j].department_name
                    var salary = results[j].salary
                    var department_id = results[j].department_id
                }
            }
            let employee = new Employee(passedResults[i].id, name, title, salary, department_id, passedResults[i].first_name, passedResults[i].last_name, passedResults[i].role_id, passedResults[i].manager_id)
            pushData(employeeArray, employee)
        }
        console.table(employeeArray)
    })
}

function populateAllTables(department_name, title, salary, department_id, first_name, last_name, role_id, manager_id) {
    clearArr()
    populateDepartment(department_name);
    populateRole(title, salary, department_id)
    populateEmployee(first_name, last_name, role_id, manager_id)
}

function pushData(arr, data) {
    arr.push(data)
}

function showQuery(table_name) {
    sql = `SELECT * FROM ${table_name}`
    queryReturn(sql, `output`)
}
module.exports = { department_name, title, salary, department_id, first_name, last_name, role_id, manager_id, populateAllTables, showQuery, pushData }